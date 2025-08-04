from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta

import os

from task_api.models import Task, Token
app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY = os.getenv("SECRET_KEY", "clave-super-secreta")
ALGORITHM = "HS256"
# ALGORITHM = os.getenv("ALGORITHM", "algortmos-super-secreto")
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Base de datos en memoria (diccionario por usuario)
fake_users_db = {
    "alice": {
        "username": "alice",
        "full_name": "Alice Wonderland",
        "hashed_password": pwd_context.hash("password123"),
        "tasks": [  {
            "id": 29734,
            "title": "pasear a Mila",
            "completed": False
        }]
    }
}

@app.get("/")
async def say_hello():
    return {"message": "Hello World"}

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(username: str, password: str):
    user = fake_users_db.get(username)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No autorizado",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = fake_users_db.get(username)
    if user is None:
        raise credentials_exception
    return user

@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Usuario o contraseña incorrectos")
    access_token = create_access_token(data={"sub": user["username"]}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/tasks", response_model=List[Task])
async def read_tasks(current_user: dict = Depends(get_current_user)):
    return current_user["tasks"]

@app.post("/tasks", response_model=Task)
async def create_task(task: Task, current_user: dict = Depends(get_current_user)):
    task.id = len(current_user["tasks"]) + 1
    current_user["tasks"].append(task)
    return task

@app.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: int, updated_task: Task, current_user: dict = Depends(get_current_user)):
    for i, task in enumerate(current_user["tasks"]):
        if isinstance(task, dict):
            task = Task(**task)  # convierte dict a objeto Task
            current_user["tasks"][i] = task  # guarda como Task para que no se mezcle

        if task.id == task_id:
            current_user["tasks"][i] = updated_task
            return updated_task

    raise HTTPException(status_code=404, detail="Tarea no encontrada")



@app.delete("/tasks/{task_id}")
async def delete_task(task_id: int, current_user: dict = Depends(get_current_user)):
    for i, task in enumerate(current_user["tasks"]):
        if isinstance(task, dict):
            task = Task(**task)
            current_user["tasks"][i] = task

        if task.id == task_id:
            current_user["tasks"].pop(i)
            return {"detail": "Tarea eliminada"}

    raise HTTPException(status_code=404, detail="Tarea no encontrada")

