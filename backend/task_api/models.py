from sqlalchemy import Column, Integer, String, Boolean
from task_api.database import Base

# Modelo SQLAlchemy
class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    completed = Column(Boolean, default=False)

# Pydantic 
#Separalos en schemas .pt
from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    completed: bool = False

class TaskRead(TaskCreate):
    id: int

    class Config:
        from_attributes = True
        
class Token(BaseModel):
    access_token: str
    token_type: str
    
class TaskCompletedUpdate(BaseModel):
    completed: bool