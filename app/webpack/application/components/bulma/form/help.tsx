import * as cn from "classnames";
import * as React from "react";

type Color = "success" | "danger";

export const Help: React.FC<{
  color?: Color;
}> = ({
  color,
  children,
}) => (
  <p className={cn("help", color && `is-${color}`)}>{children}</p>
);
