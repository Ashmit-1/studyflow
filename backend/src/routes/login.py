from fastapi import APIRouter, Depends, HTTPException
from src.deps import get_db
from src.models import User
from bcrypt import checkpw
from src.schemas import UserCreate, UserOut

router = APIRouter()

@router.post("/login", response_model=UserOut)
def login_user(user: UserCreate, db=Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    if not checkpw(user.password.encode('utf-8'), db_user.password_hash.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid password")
    return db_user
