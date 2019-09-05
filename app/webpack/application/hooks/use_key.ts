import { useEffect } from "react";

type Callback = () => void;

type Event = "keydown" | "keyup";

export const useKey = (callback: Callback, key: string, type: Event = "keyup") => {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== key) {
        return;
      }
      callback();
    };

    document.addEventListener(type, onKey);
    return () => {
      document.removeEventListener(type, onKey);
    };
  }, [callback, key, type]);
};
