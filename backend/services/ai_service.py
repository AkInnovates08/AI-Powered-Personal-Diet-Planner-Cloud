import json, logging, httpx
from ..config import get_settings
log = logging.getLogger(__name__)

def generate_ai_plan(profile):
    s = get_settings()
    if s.ai_provider.lower() != "openai_compatible" or not s.ai_api_key or not s.ai_model:
        return None
    prompt = json.dumps({k: profile.get(k, "") for k in
        ["dietary_preference","activity_level","goal","allergies","preferences"]})
    body = {
        "model": s.ai_model, "temperature": 0.2,
        "messages": [
            {"role":"system","content":
             "Return JSON only with breakfast,lunch,snack,dinner,nutrition_summary,hydration_reminder. "
             "Give general educational meal examples, not medical advice."},
            {"role":"user","content":prompt}
        ],
        "response_format":{"type":"json_object"}
    }
    try:
        r = httpx.post(s.ai_api_url, headers={"Authorization":f"Bearer {s.ai_api_key}"}, json=body,
                       timeout=s.ai_timeout_seconds)
        r.raise_for_status()
        data = r.json()
        result = json.loads(data["choices"][0]["message"]["content"])
        keys = ["breakfast","lunch","snack","dinner","nutrition_summary","hydration_reminder"]
        if not all(isinstance(result.get(k), str) for k in keys):
            raise ValueError("AI schema validation failed")
        return result
    except Exception as exc:
        log.warning("AI unavailable; fallback enabled: %s", exc)
        return None
