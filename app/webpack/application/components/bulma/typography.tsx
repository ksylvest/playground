import * as cn from "classnames";
import * as React from "react";

export const Typography: React.FC<{
  tag?: "p" | "span" | "div";
  alignment?: "centered" | "justified" | "left" | "right";
}> = ({
  tag = "p",
  alignment,
  children,
}) => {
  const Tag = tag;
  return (
    <Tag className={cn(alignment && `has-text-${alignment}`)}>{children}</Tag>
  );
};
