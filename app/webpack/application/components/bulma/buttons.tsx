import * as cn from "classnames";
import * as React from "react";

type Alignment = "left" | "centered" | "right";

export const Buttons: React.FC<{
  addons?: boolean;
  alignment?: Alignment;
}> = ({
  addons,
  alignment,
  children,
}) => (
  <div className={cn("buttons", addons && "has-addons", alignment && `is-${alignment}`)}>
    {children}
  </div>
);
