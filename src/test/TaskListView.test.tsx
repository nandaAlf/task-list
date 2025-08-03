import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { vi,describe, it, expect } from "vitest";
import { TaskListView } from "../components/TaskListView";

describe("TaskListView", () => {
  const defaultProps = {
    tasks: [],
    currentState: "initial" as const,
    inputText: "",
    onAddClick: vi.fn(),
    onInputChange: vi.fn(),
    onOK: vi.fn(),
    onAdd: vi.fn(),
    onCancel: vi.fn(),
    onToggleTask: vi.fn(),
  };

  it("muestra el mensaje para añadir tareas cuando está en estado initial", () => {
    render(<TaskListView {...defaultProps} />);
    expect(screen.getByText("Type to add new task")).toBeInTheDocument();
  });

  it("llama onAddClick al hacer clic en el contenedor initial", () => {
    render(<TaskListView {...defaultProps} />);
    fireEvent.click(screen.getByText("Type to add new task"));
    expect(defaultProps.onAddClick).toHaveBeenCalled();
  });

  it("muestra el campo de input cuando currentState es 'input'", () => {
    render(<TaskListView {...defaultProps} currentState="input" />);
    expect(screen.getByPlaceholderText("Type to add new task")).toBeInTheDocument();
  });

  it("muestra los botones Today, Public, Normal, Estimation y Open", () => {
    render(<TaskListView {...defaultProps} currentState="input" />);
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Public")).toBeInTheDocument();
    expect(screen.getByText("Normal")).toBeInTheDocument();
    expect(screen.getByText("Estimation")).toBeInTheDocument();
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("renderiza una tarea correctamente", () => {
    const task = { id: "1", title: "Complete @assignment by www.expale.com", completed: false, createdAt: "2025-06-03T00:00:00Z" };
    render(<TaskListView {...defaultProps} tasks={[task]} />);
    expect(screen.getByText("@assignment")).toBeInTheDocument();
    expect(screen.getByText("Link 1")).toBeInTheDocument();
  });
});
