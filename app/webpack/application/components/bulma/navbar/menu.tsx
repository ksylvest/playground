import * as cn from "classnames";
import * as React from "react";

export const Menu: React.FC<{
  active?: boolean;
}> = ({ active, children }) =>
  <div className={cn("navbar-menu", active && "is-active")}>{children}</div>;
