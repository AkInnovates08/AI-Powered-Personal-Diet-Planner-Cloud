from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from ..database import get_db
from ..dependencies import get_current_user
from ..models import User, DietPlan
from ..schemas import PlanGenerateRequest, PlanResponse
from ..services.diet_service import build_plan

router = APIRouter(prefix="/api/plans", tags=["Diet Plans"])

@router.post("/generate", response_model=PlanResponse, status_code=201)
def generate(payload: PlanGenerateRequest, db: Session = Depends(get_db),
             user: User = Depends(get_current_user)):
    result = build_plan(payload.model_dump())
    plan = DietPlan(user_id=user.user_id, **{k:result[k] for k in
        ["breakfast","lunch","snack","dinner","nutrition_summary","hydration_reminder"]},
        source=result["source"])
    db.add(plan); db.commit(); db.refresh(plan)
    return plan

@router.get("", response_model=list[PlanResponse])
def list_plans(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.scalars(select(DietPlan).where(DietPlan.user_id == user.user_id)
                      .order_by(DietPlan.created_at.desc())).all()

@router.get("/{plan_id}", response_model=PlanResponse)
def get_plan(plan_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    plan = db.scalar(select(DietPlan).where(DietPlan.plan_id == plan_id,
                                            DietPlan.user_id == user.user_id))
    if not plan: raise HTTPException(404, "Plan not found")
    return plan

@router.delete("/{plan_id}", status_code=204)
def delete_plan(plan_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    plan = db.scalar(select(DietPlan).where(DietPlan.plan_id == plan_id,
                                            DietPlan.user_id == user.user_id))
    if not plan: raise HTTPException(404, "Plan not found")
    db.delete(plan); db.commit()
