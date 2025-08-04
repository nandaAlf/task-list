import type { Task } from "../types/task";
import { TaskItem } from "./TaskItem";
import { AddTaskPrompt } from "./AddTask";
import { TaskInputCard } from "./TaskInputCard";

interface TaskListViewProps {
  tasks: Task[];
  currentState: "initial" | "input" | "typing";
  inputText: string;
  onAddClick: () => void;
  onInputChange: (text: string) => void;
  onOK: () => void;
  onAdd: () => void;
  onCancel: () => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditClick: (id: string) => void;
}

export function TaskListView({
  tasks,
  currentState,
  inputText,
  onAddClick,
  onInputChange,
  onOK,
  onAdd,
  onCancel,
  onToggleTask,
  onDeleteTask,
  onEditClick,
}: TaskListViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" mx-auto space-y-4">
        {currentState === "initial" && <AddTaskPrompt onClick={onAddClick} />}
        {(currentState === "input" || currentState === "typing") && (
          <TaskInputCard
            inputText={inputText}
            onInputChange={onInputChange}
            onCancel={onCancel}
            onOK={onOK}
            onAdd={onAdd}
            currentState={currentState}
          />
        )}
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            completed={task.completed}
            onToggle={() => onToggleTask(task.id)}
            onDelete={() => onDeleteTask(task.id)}
            onUpdate={() => onEditClick(task.id)}
          />
        ))}
      </div>
    </div>
  );
}
