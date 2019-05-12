import * as cn from "classnames";
import * as React from "react";

type Alignment = "left" | "right";
type Size = "small" | "medium" | "large";

export const Icon: React.FC<{
  alignment: Alignment;
  size: Size
}> = ({ size, alignment, children }) => (
  <span className={cn("icon", size && `is-${size}`, alignment && `is-${alignment}`)}>
    {children}
  </span>
);
