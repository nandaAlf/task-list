// useTasks.ts
import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { getTasks, createTask, patchStatus,  } from "../api/api";

type ViewState = "initial" | "input" | "typing";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentState, setCurrentState] = useState<ViewState>("initial");
  const [inputText, setInputText] = useState("");

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

  const handleOK = () => {
    setCurrentState("initial");
    setInputText("");
  };

  const handleAdd = async () => {
    if (inputText.trim() !== "") {
      try {
        const newTask = await createTask({
          title: inputText.trim(),
          createdAt: new Date().toISOString(),
          completed: false,
          id: ""
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
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const updatedTask = await patchStatus(id, !task.completed);

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? updatedTask : task))
    );
  } catch (error) {
    console.error("Error toggling task", error);
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
  };
}
