import * as cn from "classnames";
import * as React from "react";

export const Image: React.FC<{
  dimensions?: 16 | 24 | 32 | 48 | 64 | 96;
  rounded?: boolean;
  square?: boolean;
}> = ({
  dimensions,
  rounded,
  square,
  children,
}) => (
  <figure
    className={cn(
      "image",
      square && "is-square",
      rounded && "is-rounded",
      dimensions && `is-${dimensions}x${dimensions}`,
    )}
  >
    {children}
  </figure>
);
