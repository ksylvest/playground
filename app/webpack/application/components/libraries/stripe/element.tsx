import * as React from "react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

export const Element: React.FC<{
  element: Promise<stripe.IElement>;
}> = ({
  element: promise,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [element, setElement] = useState<stripe.IElement | undefined>(undefined);

  useEffect(() => {
    let cancel = false;
    (async () => {
      const result = await promise;
      if (cancel) { return; }
      setElement(result);
    })();
    return () => {
      cancel = true;
    };
  }, [promise]);

  useEffect(() => {
    if (!element) { return; }
    if (!ref.current) { return; }
    element.mount(ref.current);
    return () => {
      element.unmount();
    };
  }, [element, ref]);

  return <div ref={ref} />;
};
