import os, json
from openai import OpenAI
from dotenv import load_dotenv
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from src.models import Subject
from src.deps import get_db,get_current_user

load_dotenv()

nvidia_client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.getenv("NVIDIA_API_KEY")
)

@router.get("/student/{user_id}/subjects/generate-table")
def generate_table(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    subjects = (
        db.query(Subject)
        .filter(Subject.id == user_id)
        .order_by(Subject.exam_date)
        .all()
    )

    subjects_data = [
        {
            "subject_name": s.subject_name,
            "exam_date": str(s.exam_date),
            "difficulty": s.difficulty
        }
        for s in subjects
    ]

    response = nvidia_client.chat.completions.create(
        model="meta/llama-3.1-8b-instruct",
        messages=[
            {
                "role": "system",
                "content": "You generate student exam study timetables. Return only valid JSON."
            },
            {
                "role": "user",
                "content": f"""
Create a study timetable for these exams.

Subjects:
{json.dumps(subjects_data)}

Return JSON like:
{{
  "timetable": [
    {{
      "date": "YYYY-MM-DD",
      "subject": "Math",
      "task": "Revise chapter 1",
      "hours": 2
    }}
  ]
}}
"""
            }
        ],
        temperature=0.3,
        max_tokens=1000
    )

    ai_text = response.choices[0].message.content

    return {
        "subjects": subjects_data,
        "ai_timetable": ai_text
    }