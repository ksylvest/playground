import * as cn from "classnames";
import * as React from "react";

type Alignment = "centered" | "left" | "right";
type Size = "small" | "medium" | "large";
type Style = "boxed" | "toggle";

export const Tabs: React.FC<{
  alignment?: Alignment;
  size?: Size;
  style?: Style;
  fullwidth?: boolean;
}> = ({
  alignment,
  size,
  style,
  fullwidth,
  children,
}) => (
  <div
    className={cn(
      "tabs",
      alignment && `is-${alignment}`,
      size && `is-${size}`,
      style && `is-${style}`,
      fullwidth && "is-fullwidth",
    )}
  >
    {children}
  </div>
);
