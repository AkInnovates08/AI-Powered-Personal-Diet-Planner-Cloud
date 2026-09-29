from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr, Field

class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class ProfileUpdate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    age: int | None = Field(None, ge=13, le=120)
    height: float | None = Field(None, ge=50, le=250)
    weight: float | None = Field(None, ge=20, le=400)
    activity_level: str | None = None
    dietary_preference: str | None = None
    goal: str | None = None
    allergies: str | None = Field(None, max_length=500)
    preferences: str | None = Field(None, max_length=500)

class ProfileResponse(ProfileUpdate):
    model_config = ConfigDict(from_attributes=True)
    user_id: int
    email: EmailStr
    created_at: datetime

class PlanGenerateRequest(BaseModel):
    dietary_preference: str = "general"
    activity_level: str = "moderate"
    goal: str = "balanced"
    allergies: str = ""
    preferences: str = ""

class PlanResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    plan_id: int
    user_id: int
    breakfast: str
    lunch: str
    snack: str
    dinner: str
    nutrition_summary: str
    hydration_reminder: str
    source: str
    created_at: datetime

class FileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    file_id: int
    user_id: int
    filename: str
    storage_path: str
    content_type: str
    size_bytes: int
    uploaded_at: datetime
