import * as cn from "classnames";
import * as React from "react";

import { Body } from "./hero/body";
import { Foot } from "./hero/foot";
import { Head } from "./hero/head";

type Color = "primary" | "info" | "success" | "warning" | "danger"  | "light" | "dark";
type Size = "small" | "medium" | "large" | "fullheight" | "fullheight-with-navbar";

const Hero: React.FC<{
  color?: Color;
  size?: Size;
  bold?: boolean;
}> = ({ color, size, bold, children }) => (
  <section className={cn("hero", color && `is-${color}`, size && `is-${size}`, bold && "is-bold")}>
    {children}
  </section>
);

const Combined = Object.assign(Hero, {
  Body,
  Foot,
  Head,
});

export { Combined as Hero };
