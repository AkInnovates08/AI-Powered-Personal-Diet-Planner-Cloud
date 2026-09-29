import os
os.environ["DATABASE_URL"]="sqlite:///./test_core.db"
os.environ["JWT_SECRET_KEY"]="test-secret"
from fastapi.testclient import TestClient
from backend.app import app
client=TestClient(app)

def token(email,name):
    r=client.post("/api/auth/register",json={"name":name,"email":email,"password":"password123"})
    if r.status_code==409:
        r=client.post("/api/auth/login",json={"email":email,"password":"password123"})
    return r.json()["access_token"]

def test_registration_and_login():
    t=token("auth-test@example.com","Student")
    assert t

def test_protected_profile():
    assert client.get("/api/profile").status_code==401
    t=token("profile-test@example.com","Student")
    assert client.get("/api/profile",headers={"Authorization":f"Bearer {t}"}).status_code==200

def test_plan_and_user_isolation():
    a=token("a-test@example.com","A"); b=token("b-test@example.com","B")
    pa=client.post("/api/plans/generate",headers={"Authorization":f"Bearer {a}"},
      json={"dietary_preference":"vegan","activity_level":"moderate","goal":"balanced"}).json()
    assert pa["breakfast"]
    r=client.get(f"/api/plans/{pa['plan_id']}",headers={"Authorization":f"Bearer {b}"})
    assert r.status_code==404
