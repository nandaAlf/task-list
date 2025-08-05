import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import {
  getTasks,
  createTask,
  patchStatus,
  deleteTask,
  updateTask,
} from "../api/api";

type ViewState = "initial" | "input" | "typing";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentState, setCurrentState] = useState<ViewState>("initial");
  const [inputText, setInputText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error loading tasks", error);
      }
    };
    loadTasks();
  }, []);

  const handleAddClick = () => {
    setCurrentState("input");
    setInputText("");
  };

  const handleInputChange = (value: string) => {
    setInputText(value);
    setCurrentState(value.trim() ? "typing" : "input");
  };

  // const handleOK = () => {
  //   setCurrentState("initial");
  //   setInputText("");
  // };

  const handleAdd = async () => {
    if (inputText.trim() !== "") {
      try {
        const newTask = await createTask({
          title: inputText.trim(),
          createdAt: new Date().toISOString(),
          completed: false,
          id: "",
        });
        setTasks((prev) => [...prev, newTask]);
      } catch (error) {
        console.error("Error creating task", error);
      }
      setCurrentState("initial");
      setInputText("");
    }
  };

  const handleCancel = () => {
    setCurrentState("initial");
    setInputText("");
  };

  const toggleTask = async (id: string) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
      const updatedTask = await patchStatus(id, !task.completed);

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error toggling task", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleEditClick = (id: string) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (taskToEdit) {
      setInputText(taskToEdit.title);
      setEditingTaskId(id);
      setCurrentState("input");
    }
  };
  const handleOK = async () => {
    if (!inputText.trim()) return;

    if (editingTaskId) {
      const taskToUpdate = tasks.find((t) => t.id === editingTaskId);
      if (!taskToUpdate) return;

      const updatedTask = {
        ...taskToUpdate,
        title: inputText,
      };

      try {
        const saved = await updateTask(editingTaskId, updatedTask);
        setTasks((prev) =>
          prev.map((task) => (task.id === editingTaskId ? saved : task))
        );
        setEditingTaskId(null);
        setInputText("");
        setCurrentState("initial");
      } catch (error) {
        console.error("Error updating task", error);
      }
    } else {
      await handleAdd();
    }
  };
  return {
    tasks,
    currentState,
    inputText,
    handleAddClick,
    handleInputChange,
    handleOK,
    handleAdd,
    handleCancel,
    toggleTask,
    handleDeleteTask,
    handleEditClick,
  };
}
