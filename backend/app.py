from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from src.deps import get_db
from src.models import User
from src.schemas import UserCreate, UserOut
from bcrypt import hashpw, gensalt

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def user():
    return {"hello": "world"}

@app.post("/users", response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(
        username=user.username,
        email=user.email,
        password_hash=hashpw(user.password.encode('utf-8'), gensalt(rounds=12)).decode('utf-8')
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user
