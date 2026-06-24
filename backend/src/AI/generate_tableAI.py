import os, json
from openai import OpenAI
from dotenv import load_dotenv
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from src.models import Subject,AITable
from src.deps import get_db,get_current_user
from fastapi import APIRouter
from datetime import date

load_dotenv()

router = APIRouter()

nvidia_client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.getenv("NVIDIA_API_KEY")
)

today = date.today().isoformat()

@router.post("/student/{user_id}/subjects/generate-table")
def generate_table(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    today = date.today()
    subjects = (
        db.query(Subject)
        .filter(Subject.user_id == user_id,Subject.exam_date > today)
        .order_by(Subject.exam_date)
        .all()
    )

    if not subjects:
        raise HTTPException(status_code=404,detail="no subject found ")

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
                "content": """
                    You are an expert study planner.

                    Rules:
                    1. Use the exam_date as the deadline.
                    2. Hard subjects get more study days than medium subjects.
                    3. Medium subjects get more study days than easy subjects.
                    4. Never schedule study sessions after the exam date.
                    5. Never schedule dates in the past.
                    6. Return ONLY valid JSON.
                    7. Do not return explanations.
                """
            },
            {
                "role": "user",
                "content": f"""
                    Today's date: {today}

                    Create a study timetable for these upcoming exams only.

                    Subjects:
                    {json.dumps(subjects_data)}

                    Rules:
                    - Study date must be before exam_date.
                    - Study date must not be today if exam is today.
                    - Do not create sessions on or after exam_date.

                    Return ONLY JSON:
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

    time_table_data= clean_ai_json(ai_text)
    clean_text = json.dumps(time_table_data)

    existing_table = db.query(AITable).filter(AITable.user_id == user_id).first()

    if existing_table:
        existing_table.ai_table =clean_text
        db.commit()
        db.refresh(existing_table)

        
        return{
            "message" : "Table Updated seccussfully"
        }

    ai = AITable(
        user_id = user_id,
        ai_table = clean_text
        ) 
    db.add(ai)
    db.commit()
    db.refresh(ai)

    return {
        "message": "Table generated seccussfully"
    }


@router.get("/student/{user_id}/time-table")
def get_time_table(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    table = (
        db.query(AITable)
        .filter(AITable.user_id == user_id)
        .first()
    )

    if not table:
        return {
            "timetable": None,
            "message": "No timetable generated yet"
        }

    return {
        "timetable": table.ai_table
    }


def clean_ai_json(ai_text: str):
    ai_text = ai_text.strip()
    ai_text = ai_text.replace("```json", "").replace("```", "").strip()

    start = ai_text.find("{")

    if start == -1:
        raise HTTPException(status_code=500, detail="AI did not return JSON")

    try:
        decoder = json.JSONDecoder()
        data, _ = decoder.raw_decode(ai_text[start:])
        return data
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned invalid JSON")