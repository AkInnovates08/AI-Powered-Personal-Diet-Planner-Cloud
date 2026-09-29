from pathlib import Path
import uuid, boto3
from fastapi import UploadFile
from ..config import get_settings

ALLOWED = {"image/jpeg","image/png","image/webp","text/plain","application/pdf","application/json"}

class StorageService:
    def __init__(self):
        self.s = get_settings()
        self.local = Path(self.s.storage_dir)
        self.local.mkdir(parents=True, exist_ok=True)

    async def save(self, user_id, upload: UploadFile):
        content = await upload.read()
        if len(content) > self.s.max_upload_mb * 1024 * 1024:
            raise ValueError("File is too large")
        if upload.content_type not in ALLOWED:
            raise ValueError("Unsupported file type")
        name = Path(upload.filename or "upload.bin").name
        key = f"users/{user_id}/{uuid.uuid4().hex}_{name}"
        if self.s.storage_backend.lower() == "s3":
            client = boto3.client("s3", endpoint_url=self.s.s3_endpoint_url or None,
                region_name=self.s.s3_region or None, aws_access_key_id=self.s.s3_access_key,
                aws_secret_access_key=self.s.s3_secret_key)
            client.put_object(Bucket=self.s.s3_bucket, Key=key, Body=content,
                              ContentType=upload.content_type)
            return key, len(content)
        d = self.local / str(user_id); d.mkdir(parents=True, exist_ok=True)
        p = d / f"{uuid.uuid4().hex}_{name}"; p.write_bytes(content)
        return str(p), len(content)

    def read(self, path):
        if self.s.storage_backend.lower() == "s3":
            client = boto3.client("s3", endpoint_url=self.s.s3_endpoint_url or None,
                region_name=self.s.s3_region or None, aws_access_key_id=self.s.s3_access_key,
                aws_secret_access_key=self.s.s3_secret_key)
            return client.get_object(Bucket=self.s.s3_bucket, Key=path)["Body"].read()
        return Path(path).read_bytes()

    def delete(self, path):
        if self.s.storage_backend.lower() == "s3":
            client = boto3.client("s3", endpoint_url=self.s.s3_endpoint_url or None,
                region_name=self.s.s3_region or None, aws_access_key_id=self.s.s3_access_key,
                aws_secret_access_key=self.s.s3_secret_key)
            client.delete_object(Bucket=self.s.s3_bucket, Key=path)
        else:
            p = Path(path)
            if p.exists(): p.unlink()
