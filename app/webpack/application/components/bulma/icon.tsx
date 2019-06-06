import * as cn from "classnames";
import * as React from "react";

type Size = "small" | "medium" | "large";

export const Icon: React.FC<{ size?: Size }> = ({ size, children }) =>
  <span className={cn("icon", size && `is-${size}`)}>{children}</span>;
