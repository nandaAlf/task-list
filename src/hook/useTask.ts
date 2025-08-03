import { useState } from "react";
import type { Task } from "../types/task";

type ViewState = "initial" | "input" | "typing";

export function useTasks(initialTasks: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [currentState, setCurrentState] = useState<ViewState>("initial");
  const [inputText, setInputText] = useState("");

  const handleAddClick = () => {
    setCurrentState("input");
    setInputText("");
  };

  const handleInputChange = (value: string) => {
    setInputText(value);
    if (value.trim() !== "" && currentState === "input") {
      setCurrentState("typing");
    } else if (value.trim() === "" && currentState === "typing") {
      setCurrentState("input");
    }
  };

  const handleOK = () => {
    if (inputText.trim() === "") {
      setCurrentState("initial");
      setInputText("");
    }
  };

  const handleAdd = () => {
    if (inputText.trim() !== "") {
      const newTask: Task = {
        id:Date.now().toString(),
        title: inputText.trim(),
        createdAt: new Date().toISOString(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setCurrentState("initial");
      setInputText("");
    }
  };

  const handleCancel = () => {
    setCurrentState("initial");
    setInputText("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
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
