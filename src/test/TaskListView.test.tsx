import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { vi,describe, it, expect, beforeEach } from "vitest";
import { TaskListView } from "../components/TaskListView";
import type { Task } from '../types/task';

describe("TaskListView", () => {
  const mockHandlers = {
    onAddClick: vi.fn(),
    onInputChange: vi.fn(),
    onOK: vi.fn(),
    onAdd: vi.fn(),
    onCancel: vi.fn(),
    onToggleTask: vi.fn(),
    onDeleteTask: vi.fn(),
    onEditClick: vi.fn(),
  };

  const defaultProps = {
    tasks: [] as Task[],
    currentState: "initial" as const,
    inputText: "",
    ...mockHandlers,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra el mensaje para añadir tareas cuando está en estado initial", () => {
    render(<TaskListView {...defaultProps} />);
    const addMsg = screen.getByText(/type to add new task/i);
    expect(addMsg).toBeVisible();
  });

  it("llama onAddClick al hacer clic en el contenedor initial", () => {
    render(<TaskListView {...defaultProps} />);
    const addMsg = screen.getByText(/type to add new task/i);
    fireEvent.click(addMsg);
    expect(mockHandlers.onAddClick).toHaveBeenCalledTimes(1);
  });

  it("muestra el campo de input cuando currentState es 'input'", () => {
    render(<TaskListView {...defaultProps} currentState="input" />);
    const input = screen.getByPlaceholderText(/type to add new task/i);
    expect(input).toBeVisible();
  });

  it("muestra los botones Today, Public, Normal, Estimation y Open", () => {
    render(<TaskListView {...defaultProps} currentState="input" />);
    const buttons = ["Today", "Public", "Normal", "Estimation", "Open"];
    buttons.forEach((text) => {
      expect(screen.getByRole("button", { name: text })).toBeVisible();
    });
  });

  describe("con tareas renderizadas", () => {
    const task = {
      id: "1",
      title: "Complete @assignment by www.expale.com",
      completed: false,
      createdAt: "2025-06-03T00:00:00Z",
    };

    it("renderiza una tarea correctamente con texto enriquecido", () => {
      render(<TaskListView {...defaultProps} tasks={[task]} />);
      expect(screen.getByText(/@assignment/i)).toBeVisible();
      expect(screen.getByText(/www\.expale\.com/i)).toBeVisible();
      expect(screen.queryByText("Link 1")).toBeInTheDocument();
    });

    it("llama onEditClick cuando se hace clic en editar tarea", () => {
      render(<TaskListView {...defaultProps} tasks={[task]} />);
      const editButtons = screen.getAllByRole("button", { name: /edit/i });
      fireEvent.click(editButtons[0]);
      expect(mockHandlers.onEditClick).toHaveBeenCalledWith(task.id);
    });
  });
});