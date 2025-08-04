from pydantic import BaseModel

class Task(BaseModel):
    id: int
    title: str
    completed: bool = False

class User(BaseModel):
    username: str
    full_name: str

class Token(BaseModel):
    access_token: str
    token_type: str
