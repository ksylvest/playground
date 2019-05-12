import * as cn from "classnames";
import * as React from "react";

import { Body } from "./message/body";
import { Header } from "./message/header";

type Color = "white" | "light" | "dark" | "black" | "text" |
  "primary" | "link" | "info" | "success" | "warning" | "danger";
type Size = "small" | "normal" | "medium" | "large";

const Message: React.FC<{
  color?: Color;
  size?: Size;
}> = ({
  color,
  size,
  children,
}) => (
  <article className={cn("message", color && `is-${color}`, size && `is-${size}`)}>
    {children}
  </article>
);

const Combined = Object.assign(Message, {
  Body,
  Header,
});

export { Combined as Message };
