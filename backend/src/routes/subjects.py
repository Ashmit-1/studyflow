from fastapi import APIRouter, Depends
from src.deps import get_db
from sqlalchemy.orm import Session
from src.models import Subject
from src.schemas import SubjectCreate

router = APIRouter()

@router.post("/user/{user_id}/subjects")
def add_subjects(user_id: int, subject: SubjectCreate, db: Session = Depends(get_db)):
    new_subject = Subject(
        user_id=user_id,
        subject_name=subject.subject_name,
        exam_date=subject.exam_date
    )
    db.add(new_subject)
    db.commit()
    db.refresh(new_subject)
    return {"message": "Subject added successfully", "subject": new_subject}

@router.get("/user/{user_id}/subjects")
def get_subjects(user_id: int, db: Session = Depends(get_db)):
    subjects = db.query(Subject).filter(Subject.user_id == user_id).all()
    return {"subjects": subjects}
    

@router.put("/user/{user_id}/subjects/{subject_id}")
def update_subject(
    user_id: int,
    subject_id: int,
    subject: SubjectCreate,
    db: Session = Depends(get_db)
):
    existing_subject = db.query(Subject).filter(
        Subject.id == subject_id,
        Subject.user_id == user_id
    ).first()

    if not existing_subject:
        return {"error": "Subject not found"}

    existing_subject.subject_name = subject.subject_name
    existing_subject.exam_date = subject.exam_date

    db.commit()
    db.refresh(existing_subject)

    return {
        "message": "Subject updated successfully",
        "subject": existing_subject
    }

@router.delete("/user/{user_id}/subjects/{subject_id}")
def delete_subject(
    user_id: int,
    subject_id: int,
    db: Session = Depends(get_db)
):
    existing_subject = db.query(Subject).filter(
        Subject.id == subject_id,
        Subject.user_id == user_id
    ).first()

    if not existing_subject:
        return {"error": "Subject not found"}

    db.delete(existing_subject)
    db.commit()

    return {"message": "Subject deleted successfully"}