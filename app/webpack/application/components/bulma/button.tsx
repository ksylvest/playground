import * as cn from "classnames";
import * as React from "react";

type Color = "white" | "light" | "dark" | "black" | "text" |
  "primary" | "link" | "info" | "success" | "warning" | "danger";
type Size = "small" | "normal" | "medium" | "large";

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: Color;
  size?: Size;
  fullwidth?: boolean;
  inverted?: boolean;
  loading?: boolean;
  outlined?: boolean;
  rounded?: boolean;
  selected?: boolean;
}> = ({
  color,
  size,
  fullwidth,
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
      fullwidth && "is-fullwidth",
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
