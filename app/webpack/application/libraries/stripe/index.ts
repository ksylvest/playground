import { useState } from "react";

export * from "./element";

declare const ENVIRONMENT: string;

import { Base as Adapter } from "./adapter/base";
import { Fake as FakeAdapter } from "./adapter/fake";
import { Live as LiveAdapter } from "./adapter/live";

export const useAdapter = (): Adapter => {
  const [adapter] = useState(() => new (ENVIRONMENT === "test" ? FakeAdapter : LiveAdapter)());
  return adapter;
};

export const useElement = (adapter: Adapter, type: "card"): Promise<stripe.Element> => {
  const [element] = useState(() => adapter.element(type));
  return element;
};
