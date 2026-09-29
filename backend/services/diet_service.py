from pathlib import Path
from ai_engine.diet_engine import generate_rule_based_plan
from .ai_service import generate_ai_plan

DATA = Path(__file__).resolve().parents[2] / "ai_engine" / "food_data.json"

def build_plan(profile):
    ai = generate_ai_plan(profile)
    if ai:
        ai["source"] = "ai-api"
        return ai
    result = generate_rule_based_plan(profile, DATA)
    result["source"] = "rule-based-fallback"
    return result
