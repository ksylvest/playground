import * as cn from "classnames";
import * as React from "react";

type Color = "black" | "light" | "white" | "primary" | "link"  |"info" | "success" | "warning" | "danger";
type Size = "normal" | "medium" | "large";

export const Tag: React.FC<{
  delete?: boolean
  rounded?: boolean;
  color?: Color;
  size?: Size;
}> = ({
  delete: deleting,
  rounded,
  color,
  size,
  children,
}) => (
  <span
    className={cn(
      "tag",
      color && `is-${color}`,
      size && `is-${size}`,
      rounded && "is-rounded",
      deleting && "is-delete",
    )}
  >
    {children}
  </span>
);
