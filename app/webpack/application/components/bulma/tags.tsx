import * as cn from "classnames";
import * as React from "react";

export const Tags: React.FC<{
  addons?: boolean;
}> = ({
  addons,
  children,
}) =>
  <div className={cn("tags", addons && "has-addons")}>{children}</div>;
