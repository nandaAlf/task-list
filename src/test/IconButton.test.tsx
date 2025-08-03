import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { Calendar } from "react-feather";
import { describe, it, expect, vi } from "vitest";
import { IconButton } from "../components/IconButton";

describe("IconButton", () => {
  it("renderiza el ícono y el label correctamente", () => {
    render(<IconButton icon={<Calendar data-testid="icon" />} label="Fecha" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Fecha")).toBeInTheDocument();
  });

  it("aplica estilos del variant outline por defecto", () => {
    const { container } = render(
      <IconButton icon={<Calendar />} label="Calendario" />
    );
    expect(container.firstChild).toHaveClass("text-gray-400");
    expect(container.firstChild).not.toHaveClass("bg-gray-200");
  });

  it("puede ser deshabilitado", () => {
    render(<IconButton icon={<Calendar />} label="Fecha" disabled />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("llama a onClick cuando se hace clic y no está deshabilitado", () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        icon={<Calendar />}
        label="Click"
        disabled={false}
        onClick={handleClick}
      />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("no llama a onClick cuando está deshabilitado", () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        icon={<Calendar />}
        label="Click"
        disabled
        onClick={handleClick}
      />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
