import * as cn from "classnames";
import * as React from "react";

type Color = "white" | "light" | "dark" | "black" | "text" |
  "primary" | "link" | "info" | "success" | "warning" | "danger";

const Delete: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props} className="delete">{children}</button>
);

const Notification: React.FC<{
  color?: Color;
}> = ({
  color,
  children,
}) => (
  <div className={cn("notification", color && `is-${color}`)}>{children}</div>
);

const Combined = Object.assign(Notification, { Delete });
export { Combined as Notification };
