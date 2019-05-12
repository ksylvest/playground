import * as cn from "classnames";
import * as React from "react";

type Icons = "left" | "right" | "both";

export const Control: React.FC<{
  icons?: Icons;
}> = ({
  icons,
  children,
}) => (
  <div
    className={cn("control",
      (icons === "left" || icons === "both") && "has-icons-left",
      (icons === "right" || icons === "both") && "has-icons-right",
    )}
  >
    {children}
  </div>
);
