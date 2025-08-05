# Task Manager App 📝

**A personal task management application**

- **Frontend**: Vite + React + TypeScript + TailwindCSS  
- **Backend**: FastAPI + SQLite  
- **Despliegue**: Vercel (Frontend) + Render (Backend)

🔗 **Production URL**: [https://task-list-six-lime.vercel.app/](https://task-list-six-lime.vercel.app/)

---

## 🔐 Authentication

The API uses JSON Web Tokens (JWT) authentication.
The login process generates an access token that must be included in authenticated requests (via header Authorization: Bearer <token>)

### 👤  Test User
During the test, the app automatically starts logged in with an existing valid user:

🧑 Username: alice  
🔑 Password: password1234

## Características 
✅ List, create, and edit tasks
📝 Supports rich syntax: mentions, URLs, emails, links
📱 Responsive design with TailwindCSS
🌐 Production-ready deployment (Vercel + Render)


## Local Setup 🛠️

### Backend (FastAPI)

1. Create file`.env`:
SECRET_KEY= "supersecretkey123"

2. Run commands:
bash
$cd backend
$python -m venv venv
# Windows:
$venv\Scripts\activate
# Mac/Linux:
$source venv/bin/activate

$pip install -r requirements.txt
$uvicorn task_api.main:app --reload

### Frontend (React)
bash
$npm install
$npm run dev