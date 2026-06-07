from fastapi import FastAPI,Depends,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from src.deps import get_db
from src.models import User
from src.schemas import UserCreate, UserOut, LoginOut, StudentOut
from bcrypt import hashpw, gensalt
from src.routes.login import router as login_router
from src.routes.studentlog import route as student_login
from src.auth.redis_client import redis_client
from src.auth.opt import generate_otp, save_otp, verify_otp

app = FastAPI()
app.include_router(login_router)
app.include_router(student_login)

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
    try:
        db_user = User(
            username=user.username,
            email=user.email,
            password_hash=hashpw(
                user.password.encode('utf-8'),
                gensalt(12)
            ).decode('utf-8')
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    except IntegrityError as e:
        db.rollback()

        if "username" in str(e.orig):
            raise HTTPException(400, "Username already exists")

        if "email" in str(e.orig):
            raise HTTPException(400, "Email already exists")

        raise HTTPException(400, "Duplicate entry")

@app.get("/users/{user_id}", response_model=UserOut)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user