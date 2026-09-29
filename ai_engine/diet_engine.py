import json

def generate_rule_based_plan(profile, path):
    pref = (profile.get("dietary_preference") or "general").lower()
    key = {"non-vegetarian":"non_vegetarian","non_vegetarian":"non_vegetarian"}.get(pref, pref)
    if key not in {"general","vegetarian","vegan","non_vegetarian"}: key = "general"
    data = json.loads(path.read_text(encoding="utf-8"))[key]
    activity = str(profile.get("activity_level") or "moderate").replace("_"," ")
    goal = str(profile.get("goal") or "balanced").replace("_"," ")
    seed = len(activity) + len(goal) + len(str(profile.get("preferences") or ""))
    pick = lambda arr, n: arr[n % len(arr)]
    return {
      "breakfast":pick(data["breakfast"],seed),
      "lunch":pick(data["lunch"],seed+1),
      "snack":pick(data["snack"],seed+2),
      "dinner":pick(data["dinner"],seed+3),
      "nutrition_summary":f"General example emphasizing variety and balanced food groups. Activity profile: {activity}; goal: {goal}. Review exclusions before using any meal idea.",
      "hydration_reminder":"Hydration needs vary. Use normal daily routines and thirst as a general reminder; seek professional guidance for individual medical needs."
    }
