from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes=True

class UserLogin(BaseModel):
    username: str
    password: str

class LoginOut(BaseModel):
    id:int
    username: str
    access_token: str
    token_type: str

class StudentOut(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes= True

class OTPRequest(BaseModel):
    email: EmailStr

class OTPVerify(BaseModel):
    email: EmailStr
    otp: str