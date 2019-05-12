import * as React from "react";

export const Background: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => (
  <div {...props} className="modal-background">{children}</div>
);
