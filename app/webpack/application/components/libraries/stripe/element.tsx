import * as React from "react";
import {
  useEffect,
  useRef,
} from "react";

export const Element: React.FC<{
  element: {
    mount(element: HTMLElement): void;
    unmount(): void;
  };
}> = ({
  element,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) { return; }
    element.mount(ref.current);
    return () => {
      element.unmount();
    };
  }, [element]);

  return <div ref={ref} />;
};
