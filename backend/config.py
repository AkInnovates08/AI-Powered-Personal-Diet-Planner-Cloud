from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_url: str = "sqlite:///./diet_planner.db"
    jwt_secret_key: str = "change-me"
    access_token_expire_minutes: int = 60
    cors_origins: str = "http://localhost:5173"
    storage_backend: str = "local"
    storage_dir: str = "storage"
    max_upload_mb: int = 5
    s3_endpoint_url: str | None = None
    s3_bucket: str | None = None
    s3_region: str | None = None
    s3_access_key: str | None = None
    s3_secret_key: str | None = None
    ai_provider: str = "none"
    ai_api_url: str = "https://api.openai.com/v1/chat/completions"
    ai_api_key: str | None = None
    ai_model: str | None = None
    ai_timeout_seconds: int = 20
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    @property
    def cors_list(self):
        return [x.strip() for x in self.cors_origins.split(",") if x.strip()]

@lru_cache
def get_settings():
    return Settings()
