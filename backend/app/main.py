import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .database import create_tables
from .routers import auth

app = FastAPI(title="Prelegal API", version="1.0.0")

# CORS is only needed when the Next.js dev server (port 3000) calls this backend
# (port 8000). In production, both are served from the same origin so no CORS applies.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup() -> None:
    # Ensure the SQLite data directory exists (path extracted from DATABASE_URL)
    db_url = os.getenv("DATABASE_URL", "")
    if db_url.startswith("sqlite:///"):
        db_path = db_url.replace("sqlite:///", "")
        data_dir = os.path.dirname(db_path)
        if data_dir:
            os.makedirs(data_dir, exist_ok=True)
    create_tables()


app.include_router(auth.router, prefix="/api/auth", tags=["auth"])


@app.get("/api/health")
def health():
    return {"status": "ok"}


# Serve frontend static files — must be registered last
static_dir = os.getenv("STATIC_DIR", "/app/static")
if os.path.isdir(static_dir):
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
