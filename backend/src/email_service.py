import os
import resend
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")

def send_otp_email(to_email: str, otp: str):
    if not resend.api_key:
        raise HTTPException(status_code=500, detail="RESEND_API_KEY missing")

    try:
        resend.Emails.send({
            "from": "StudyFlow <onboarding@resend.dev>",
            "to": [to_email],
            "subject": "STUDYFLOW OTP",
            "html": f"""
                <h2>STUDYFLOW OTP</h2>
                <p><b>Dear User,</b></p>
                <p>Your OTP is: <b>{otp}</b></p>
                <p>Please use this OTP to verify your email address.</p>
            """
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Email failed: {str(e)}")