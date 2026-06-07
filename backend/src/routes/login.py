from fastapi import APIRouter, Depends, HTTPException
from src.deps import get_db
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from src.models import User
from bcrypt import checkpw
from src.schemas import LoginOut
from src.auth.auth_utils import create_access_token

router = APIRouter()

@router.post("/login", response_model=LoginOut)
def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == form_data.username).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    if not checkpw(form_data.password.encode('utf-8'), db_user.password_hash.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid password")
    
    access_token = create_access_token(data={"sub": str(db_user.id)})
    return {
        "id": db_user.id,
        "username":db_user.username,
        "access_token": access_token,
        "token_type": "bearer"
        }
