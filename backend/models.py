from datetime import datetime, timezone
from sqlalchemy import String, Integer, Float, DateTime, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .database import Base

def now_utc():
    return datetime.now(timezone.utc)

class User(Base):
    __tablename__ = "users"
    user_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    age: Mapped[int | None] = mapped_column(Integer)
    height: Mapped[float | None] = mapped_column(Float)
    weight: Mapped[float | None] = mapped_column(Float)
    activity_level: Mapped[str | None] = mapped_column(String(50))
    dietary_preference: Mapped[str | None] = mapped_column(String(50))
    goal: Mapped[str | None] = mapped_column(String(80))
    allergies: Mapped[str | None] = mapped_column(Text)
    preferences: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)
    plans: Mapped[list["DietPlan"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    files: Mapped[list["UserFile"]] = relationship(back_populates="user", cascade="all, delete-orphan")

class DietPlan(Base):
    __tablename__ = "diet_plans"
    plan_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"), index=True)
    breakfast: Mapped[str] = mapped_column(Text)
    lunch: Mapped[str] = mapped_column(Text)
    snack: Mapped[str] = mapped_column(Text)
    dinner: Mapped[str] = mapped_column(Text)
    nutrition_summary: Mapped[str] = mapped_column(Text)
    hydration_reminder: Mapped[str] = mapped_column(Text)
    source: Mapped[str] = mapped_column(String(40))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)
    user: Mapped["User"] = relationship(back_populates="plans")

class UserFile(Base):
    __tablename__ = "user_files"
    file_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"), index=True)
    filename: Mapped[str] = mapped_column(String(255))
    storage_path: Mapped[str] = mapped_column(String(500))
    content_type: Mapped[str] = mapped_column(String(120))
    size_bytes: Mapped[int] = mapped_column(Integer)
    uploaded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)
    user: Mapped["User"] = relationship(back_populates="files")
