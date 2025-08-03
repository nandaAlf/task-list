import '@testing-library/jest-dom';
import { describe, it, expect } from "vitest";
import type { Task } from "../types/task";
import { render, screen } from "@testing-library/react";
import { TaskItem } from "../components/TaskItem";

const mockTask: Task = {
  id: "1",
  title: "Test",
  completed: false,
  createdAt: new Date().toISOString(),
};

describe("TaskItem", () => {
  it("renders the task title", () => {
    render(
      <TaskItem
        id={mockTask.id}
        title={mockTask.title}
        completed={mockTask.completed}
        onToggle={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    expect(
      screen.getByText((content) => content.includes("Test"))
    ).toBeInTheDocument();
  });
});
