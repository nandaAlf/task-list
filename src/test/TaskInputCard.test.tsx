/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useIsMobile } from "../hook/useIsMobile";
import { TaskInputCard } from "../components/TaskInputCard";

vi.mock("../hook/useIsMobile", () => ({
  useIsMobile: vi.fn(),
}));

describe("TaskInputCard", () => {
  const onInputChange = vi.fn();
  const onCancel = vi.fn();
  const onOK = vi.fn();
  const onAdd = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with state 'input' on desktop", () => {
    (useIsMobile as any).mockReturnValue(false);

    render(
      <TaskInputCard
        inputText="Buy milk"
        onInputChange={onInputChange}
        onCancel={onCancel}
        onOK={onOK}
        onAdd={onAdd}
        currentState="input"
      />
    );

    expect(screen.getByPlaceholderText(/type to add new task/i)).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("renders correctly with state 'typing' on desktop", () => {
    (useIsMobile as any).mockReturnValue(false);

    render(
      <TaskInputCard
        inputText=""
        onInputChange={onInputChange}
        onCancel={onCancel}
        onOK={onOK}
        onAdd={onAdd}
        currentState="typing"
      />
    );

    expect(screen.queryByText("OK")).not.toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("calls onInputChange when input changes", () => {
    (useIsMobile as any).mockReturnValue(false);

    render(
      <TaskInputCard
        inputText=""
        onInputChange={onInputChange}
        onCancel={onCancel}
        onOK={onOK}
        onAdd={onAdd}
        currentState="input"
      />
    );

    const input = screen.getByPlaceholderText(/type to add new task/i);
    fireEvent.change(input, { target: { value: "New task" } });

    expect(onInputChange).toHaveBeenCalledWith("New task");
  });

  it("calls onCancel when Cancel button is clicked", () => {
    (useIsMobile as any).mockReturnValue(false);

    render(
      <TaskInputCard
        inputText=""
        onInputChange={onInputChange}
        onCancel={onCancel}
        onOK={onOK}
        onAdd={onAdd}
        currentState="input"
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalled();
  });

  it("calls onOK when OK button is clicked", () => {
    (useIsMobile as any).mockReturnValue(false);

    render(
      <TaskInputCard
        inputText=""
        onInputChange={onInputChange}
        onCancel={onCancel}
        onOK={onOK}
        onAdd={onAdd}
        currentState="input"
      />
    );

    fireEvent.click(screen.getByText("OK"));
    expect(onOK).toHaveBeenCalled();
  });

  it("calls onAdd when Add button is clicked", () => {
    (useIsMobile as any).mockReturnValue(false);

    render(
      <TaskInputCard
        inputText=""
        onInputChange={onInputChange}
        onCancel={onCancel}
        onOK={onOK}
        onAdd={onAdd}
        currentState="typing"
      />
    );

    fireEvent.click(screen.getByText("Add"));
    expect(onAdd).toHaveBeenCalled();
  });
});
