import * as cn from "classnames";
import * as React from "react";

export const Item: React.FC<{
  dropdown?: boolean;
  hoverable?: boolean;
  active?: boolean;
}> = ({
  dropdown,
  hoverable,
  active,
  children,
}) => (
  <div className={cn("navbar-item", hoverable && "is-hoverable", active && "is-active", dropdown && "has-dropdown")}>
    {children}
  </div>
);
