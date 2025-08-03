export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  showLabelAt?: string; // clase tailwind como "md:inline" o personalizada
   variant?: "filled" | "outlined";
}
