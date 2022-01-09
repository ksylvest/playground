import * as React from "react";
import { useEffect, useRef, useState } from "react";

export const Element: React.FC<{
  element: stripe.Element | undefined;
}> = ({ element }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!element || !ref.current) {
      return;
    }
    element.mount(ref.current);
    return (): void => {
      element.unmount();
    };
  }, [element, ref]);

  return <div ref={ref} />;
};
