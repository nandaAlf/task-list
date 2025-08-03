import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AddTaskPrompt } from "../components/AddTask";

describe("AddTaskPrompt", () => {

  it("should call onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<AddTaskPrompt onClick={handleClick} />);
    const prompt = screen.getByText("Type to add new task");
    fireEvent.click(prompt);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
