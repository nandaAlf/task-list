
import type { IconButtonProps } from "../types/iconButton";
// import { cn } from "@/lib/utils"; // si usas una función para combinar clases


export const IconButton = ({
  icon,
  label="",
  showLabelAt = "hidden [@media(min-width:1230px)]:inline",
  className,
  variant = "outlined", // "filled" | "outlined"
  ...props
}: IconButtonProps) => {
  const baseStyle = `text-xs flex items-center gap-1 px-1 py-1 rounded transition-colors`;
  const variantStyle = variant === "filled"
      ? "bg-gray-200 text-black-400 hover:bg-gray-100 hover:text-black-600 "
    : "text-gray-400 hover:bg-gray-100 border border-gray-300";

  return (
    <button
      type="button"
      className={`${className || ""} ${baseStyle} ${variantStyle} `}
      {...props}
    >
      {icon }
      {label && <span className={showLabelAt}>{label}</span>}
    </button>
  );
};