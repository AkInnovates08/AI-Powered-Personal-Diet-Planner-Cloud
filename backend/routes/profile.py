from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..dependencies import get_current_user
from ..models import User
from ..schemas import ProfileUpdate, ProfileResponse

router = APIRouter(prefix="/api/profile", tags=["Profile"])

@router.get("", response_model=ProfileResponse)
def get_profile(user: User = Depends(get_current_user)):
    return user

@router.put("", response_model=ProfileResponse)
def update_profile(payload: ProfileUpdate, db: Session = Depends(get_db),
                   user: User = Depends(get_current_user)):
    for k, v in payload.model_dump().items():
        setattr(user, k, v)
    db.commit(); db.refresh(user)
    return user
