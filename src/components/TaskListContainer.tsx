import { useTasks } from "../hook/useTask";
import { TaskListView } from "./TaskListView";

export function TaskListContainer() {
  const {
    tasks,
    currentState,
    inputText,
    handleAddClick,
    handleInputChange,
    handleOK,
    handleAdd,
    handleCancel,
    toggleTask,
  } = useTasks();

  return (
    <TaskListView
      tasks={tasks}
      currentState={currentState}
      inputText={inputText}
      onAddClick={handleAddClick}
      onInputChange={handleInputChange}
      onOK={handleOK}
      onAdd={handleAdd}
      onCancel={handleCancel}
      onToggleTask={toggleTask}
    />
  );
}
