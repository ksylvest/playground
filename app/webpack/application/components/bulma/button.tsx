import * as cn from "classnames";
import * as React from "react";

type Color = "white" | "light" | "dark" | "black" | "text" |
  "primary" | "link" | "info" | "success" | "warning" | "danger";
type Size = "small" | "normal" | "medium" | "large";

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: Color;
  size?: Size;
  inverted?: boolean;
  loading?: boolean;
  outlined?: boolean;
  rounded?: boolean;
  selected?: boolean;
}> = ({
  color,
  size,
  inverted,
  outlined,
  loading,
  rounded,
  selected,
  children,
  className,
  ...props
}) => (
  <button
    {...props}
    className={cn(
      "button",
      color && `is-${color}`,
      size && `is-${size}`,
      inverted && "is-inverted",
      outlined && "is-outlined",
      loading && "is-loading",
      rounded && "is-rounded",
      selected && "is-selected",
      className,
    )}
  >
    {children}
  </button>
);
