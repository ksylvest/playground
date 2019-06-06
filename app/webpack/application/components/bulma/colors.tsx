import * as cn from "classnames";
import * as React from "react";

type Color = "white" | "black" | "light" | "dark" | "grey" |
  "primary" | "info" | "link" | "success" | "warning" | "danger";

export const Colors: React.FC<{
  text?: Color;
  background?: Color;
}> = ({
  text,
  background,
  children,
}) => (
  <span
    children={children}
    className={cn(
      text && `has-text-${text}`,
      background && `has-background-${background}`,
    )}
  />
);
