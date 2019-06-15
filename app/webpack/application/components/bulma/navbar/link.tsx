import * as React from "react";

export const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  ...props
}) => (
  <a {...props} className="navbar-link">{children}</a>
);
