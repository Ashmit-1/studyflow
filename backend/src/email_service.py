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
            "from": "StudyFlow <onboarding@studyflow.dpdns.org>",
            "subject": "Your StudyFlow verification code",
            "to": [to_email],
            "html": f"""
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Your StudyFlow verification code</h2>

            <p>Hello,</p>

            <p>Use this code to verify your email address:</p>

            <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">
            {otp}
            </p>

            <p>This code will expire soon. If you didn’t request this, you can ignore this email.</p>

            <p>Thanks,<br>StudyFlow Team</p>
            </div>
            """,
            "text": f"""
            Your StudyFlow verification code is: {otp}
            
            Use this code to verify your email address.
            
            If you didn’t request this, you can ignore this email.
            
            Thanks,
            StudyFlow Team
            """
        })

    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Email failed: {str(e)}")