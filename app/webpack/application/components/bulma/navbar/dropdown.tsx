import * as cn from "classnames";
import * as React from "react";

export const Dropdown: React.FC<{
  boxed?: boolean;
  direction?: "right" | "left";
}> = ({ boxed, direction, children }) => (
  <div className={cn("navbar-dropdown", boxed && "is-boxed", direction && `is-${direction}`)}>
    {children}
  </div>
);
