import * as React from "react";

const DEFAULT_TAG = "p";

export const Item: React.FC<{
  tag: "a" | "p";
} & React.HTMLAttributes<HTMLElement>> = ({
  tag = DEFAULT_TAG,
  children,
  ...props
}) => {
  const Tag = tag;
  return (
    <Tag className="card-footer-item" {...props}>{children}</Tag>
  );
};
