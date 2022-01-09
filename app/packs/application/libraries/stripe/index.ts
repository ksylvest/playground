import { useEffect, useState } from "react";

export * from "./element";

declare const ENVIRONMENT: string;

import { Base as Adapter } from "./adapter/base";
import { Fake as FakeAdapter } from "./adapter/fake";
import { Live as LiveAdapter } from "./adapter/live";

const usePromise = <T>(promise: Promise<T>) => {
  const [result, setResult] = useState<T | undefined>();

  useEffect(() => {
    let cancel = false;
    promise.then((value) => {
      if (cancel) return;
      setResult(value);
    });

    return () => {
      cancel = true;
    };
  }, [promise]);

  return result;
};

export const useAdapter = (): Adapter => {
  const [adapter] = useState(() => new (ENVIRONMENT === "test" ? FakeAdapter : LiveAdapter)());
  return adapter;
};

export const useElement = (adapter: Adapter, type: "card"): stripe.Element | undefined => {
  const [promise] = useState(() => adapter.element(type));
  const element = usePromise(promise);

  return element;
};
