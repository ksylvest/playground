import * as React from "react";
import { useEffect, useRef, useState } from "react";

export const Element: React.FC<{
  element: Promise<stripe.Element>;
}> = ({ element: promise }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [element, setElement] = useState<stripe.Element | undefined>(undefined);

  useEffect(() => {
    let cancel = false;
    (async (): Promise<void> => {
      const result = await promise;
      if (cancel) {
        return;
      }
      setElement(result);
    })();
    return (): void => {
      cancel = true;
    };
  }, [promise]);

  useEffect(() => {
    if (!element) {
      return;
    }
    if (!ref.current) {
      return;
    }
    element.mount(ref.current);
    return (): void => {
      element.unmount();
    };
  }, [element, ref]);

  return <div ref={ref} />;
};
