import * as cn from "classnames";
import * as React from "react";

type Size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const Column: React.FC<{
  size?: Size;
  narrow?: boolean;
}> = ({
  size,
  narrow,
  children,
}) => (
  <div className={cn("column", size && `is-${size}`, narrow && "is-narrow")}>
    {children}
  </div>
);
