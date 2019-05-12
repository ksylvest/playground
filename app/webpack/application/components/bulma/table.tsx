import * as cn from "classnames";
import * as React from "react";

export const Table: React.FC<{
  bordered?: boolean;
  fullwidth?: boolean;
  hoverable?: boolean;
  striped?: boolean;
}> = ({
  bordered,
  fullwidth,
  hoverable,
  striped,
  children,
}) => (
  <table
    className={cn(
      "table",
      bordered && "is-bordered",
      fullwidth && "is-fullwidth",
      hoverable && "is-hoverable",
      striped && "is-striped",
    )}
  >
    {children}
  </table>
);
