import { useEffect } from "react";

type Callback = () => void;

type Event = "keydown" | "keyup";

export const useKey = (callback: Callback, key: string, type: Event = "keyup"): void => {
  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if (event.key !== key) {
        return;
      }
      callback();
    };

    document.addEventListener(type, onKey);
    return (): void => {
      document.removeEventListener(type, onKey);
    };
  }, [callback, key, type]);
};
