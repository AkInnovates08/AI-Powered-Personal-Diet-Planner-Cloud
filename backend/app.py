import logging, os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import get_settings
from .database import Base, engine
from .routes import auth, profile, plans, files

logging.basicConfig(level=logging.INFO)

@asynccontextmanager
async def lifespan(app):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="AI-Powered Personal Diet Planner", version="1.0.0",
              description="Academic cloud-computing demonstration using synthetic/demo data.",
              lifespan=lifespan)
s = get_settings()
app.add_middleware(CORSMiddleware, allow_origins=s.cors_list, allow_credentials=True,
                   allow_methods=["*"], allow_headers=["*"])
app.include_router(auth.router); app.include_router(profile.router)
app.include_router(plans.router); app.include_router(files.router)

@app.get("/health")
def health(): return {"status":"ok","service":"diet-planner-api"}

@app.get("/")
def root(): return {"name":"AI-Powered Personal Diet Planner","docs":"/docs",
                    "disclaimer":"Educational/general-wellness demo; not medical advice."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app:app", host="0.0.0.0", port=int(os.getenv("PORT","8000")))
