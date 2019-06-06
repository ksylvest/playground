import * as cn from "classnames";
import * as React from "react";

export const Columns: React.FC<{
  mobile?: boolean;
  desktop?: boolean;
  centered?: boolean;
  vcentered?: boolean;
  multiline?: boolean;
  gap?: "gapless" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 6 | 7;
}> = ({
  mobile,
  desktop,
  centered,
  vcentered,
  multiline,
  gap,
  children,
}) => (
  <div
    className={cn(
      "columns",
      gap && `is-variable is-${gap}`,
      mobile && "is-mobile",
      desktop && "is-desktop",
      multiline && "is-multiline",
      centered && "is-centered",
      vcentered && "is-vcentered",
    )}
  >
    {children}
  </div>
);
