import { useEffect, useState } from "react";

type Value = string | undefined;
type Accessor = (value: string | undefined) => void;

export const useStorage = (storage: Storage, key: string): [Value, Accessor] => {
  const [value, setValue] = useState<Value>(() => storage.getItem(key) ?? undefined);

  useEffect(() => {
    const listener = () => {
      setValue(storage.getItem(key) ?? undefined);
    };

    addEventListener("storage", listener);

    return () => {
      removeEventListener("storage", listener);
    };
  }, [key]);

  return [
    value,
    (value: string | undefined) => {
      setValue(value);

      if (value) storage.setItem(key, value);
      else storage.removeItem(key);
    },
  ];
};
