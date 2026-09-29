from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from fastapi.responses import Response
from sqlalchemy import select
from sqlalchemy.orm import Session
from ..database import get_db
from ..dependencies import get_current_user
from ..models import User, UserFile
from ..schemas import FileResponse
from ..services.storage_service import StorageService

router = APIRouter(prefix="/api/files", tags=["Files"])
storage = StorageService()

@router.post("/upload", response_model=FileResponse, status_code=201)
async def upload(file: UploadFile = File(...), db: Session = Depends(get_db),
                 user: User = Depends(get_current_user)):
    try: path, size = await storage.save(user.user_id, file)
    except ValueError as e: raise HTTPException(400, str(e))
    record = UserFile(user_id=user.user_id, filename=file.filename or "upload.bin",
        storage_path=path, content_type=file.content_type or "application/octet-stream",
        size_bytes=size)
    db.add(record); db.commit(); db.refresh(record)
    return record

@router.get("", response_model=list[FileResponse])
def list_files(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.scalars(select(UserFile).where(UserFile.user_id == user.user_id)
                      .order_by(UserFile.uploaded_at.desc())).all()

@router.get("/{file_id}/download")
def download(file_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    record = db.scalar(select(UserFile).where(UserFile.file_id == file_id,
                                              UserFile.user_id == user.user_id))
    if not record: raise HTTPException(404, "File not found")
    try: content = storage.read(record.storage_path)
    except Exception: raise HTTPException(404, "Stored file unavailable")
    return Response(content=content, media_type=record.content_type,
                    headers={"Content-Disposition": f'attachment; filename="{record.filename}"'})

@router.delete("/{file_id}", status_code=204)
def delete_file(file_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    record = db.scalar(select(UserFile).where(UserFile.file_id == file_id,
                                              UserFile.user_id == user.user_id))
    if not record: raise HTTPException(404, "File not found")
    try: storage.delete(record.storage_path)
    except Exception: pass
    db.delete(record); db.commit()
