import * as cn from "classnames";
import * as React from "react";

import { CTA } from "./file/cta";
import { Icon } from "./file/icon";
import { Input } from "./file/input";
import { Label } from "./file/label";
import { Name } from "./file/name";

type Alignment = "left" | "centered" | "right";
type Size = "small" | "medium" | "large";
type Color = "white" | "black" | "light" | "dark" | "primary" | "link" | "info" | "success" | "warning" | "danger";

const File: React.FC<{
  name?: string;
  alignment?: Alignment;
  color?: Color;
  size?: Size;
  boxed?: boolean;
  fullwidth?: boolean;
}> = ({
  name,
  alignment,
  color,
  size,
  boxed,
  fullwidth,
  children,
}) => (
  <div
    className={cn(
      "file",
      boxed && "is-boxed",
      fullwidth && "is-fullwidth",
      name && "has-name",
      alignment && `is-${alignment}`,
      color && `is-${color}`,
      size && `is-${size}`,
    )}
  >
    {children}
  </div>
);

const Combined = Object.assign(File, {
  CTA,
  Icon,
  Input,
  Label,
  Name,
});

export { Combined as File };
