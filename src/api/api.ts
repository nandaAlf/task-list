import axios from "axios";
import type { Task } from "../types/task";

// const API_URL = "http://localhost:8000"; #local
const API_URL = "https://task-list-395r.onrender.com";    // production

// Guardar y recuperar token del localStorage
const getToken = () => localStorage.getItem("token");

const api = axios.create({
  baseURL: API_URL,
});

// Intercepta cada request para agregar el token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// LOGIN
export const login = async (username: string, password: string) => {
  // alert("login")
  const response = await axios.post(
    `${API_URL}/token`,
    new URLSearchParams({
      username,
      password,
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
  const { access_token } = response.data;
  console.log(response.data)
  localStorage.setItem("token", access_token);
  return access_token;
};

// CRUD de tareas
export const getTasks = async () => {
  const response = await api.get("/tasks");
  console.log("daaa",response)
  return response.data;
};

export const createTask = async (task: Task) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const updateTask = async (id: string, task: Task) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
export async function patchStatus(id: string, completed: boolean) {
  const response = await api.patch(`tasks/completed/${id}`, { completed });
  console.log('REVISA',response)
  return response.data;
  
}