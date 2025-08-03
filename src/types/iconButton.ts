export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  showLabelAt?: string; // breakpoint 1230px
  variant?: "filled" | "outlined";
}
