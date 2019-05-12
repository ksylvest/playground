import * as React from "react";

export const Delete: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button {...props} type="button" className="delete" />
);
