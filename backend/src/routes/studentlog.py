from fastapi import APIRouter,Depends,HTTPException
from src.deps import get_db
from sqlalchemy.orm import Session
from src.schemas import StudentOut
from src.models import User


route = APIRouter()

@route.get("/student/{user_id}", response_model=StudentOut)
def student_dash(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="user not found")
    
    return db_user

