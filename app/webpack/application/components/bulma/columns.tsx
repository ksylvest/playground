import * as cn from "classnames";
import * as React from "react";

export const Columns: React.FC<{
  mobile?: boolean;
  desktop?: boolean;
  centered?: boolean;
  vcentered?: boolean;
  multiline?: boolean;
  gapless?: boolean;
}> = ({
  mobile,
  desktop,
  centered,
  vcentered,
  multiline,
  gapless,
  children,
}) => (
  <div
    className={cn(
      "columns",
      mobile && "is-mobile",
      desktop && "is-desktop",
      multiline && "is-multiline",
      centered && "is-centered",
      gapless && "is-gapless",
      vcentered && "is-vcentered",
    )}
  >
    {children}
  </div>
);
