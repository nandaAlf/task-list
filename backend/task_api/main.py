from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from uuid import uuid4

app = FastAPI()

# Base de datos en memoria (diccionario por usuario)
db = {}

# Modelo de tarea
class Tarea(BaseModel):
    id: str = None
    descripcion: str
    completada: bool = False


@app.get("/")
async def say_hello():
    return {"message": "Hello World"}