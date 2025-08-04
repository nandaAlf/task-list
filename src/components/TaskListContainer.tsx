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
    handleDeleteTask,
    handleEditClick
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
      onDeleteTask={handleDeleteTask}
      onEditClick={handleEditClick}
    />
  );
}
