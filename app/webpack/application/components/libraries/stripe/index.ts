import { useState } from "react";

export * from "./element";

declare const ENVIRONMENT: string;

import { IBase as IAdapter } from "./adapter/base";
import { Fake as FakeAdapter } from "./adapter/fake";
import { Live as LiveAdapter } from "./adapter/live";

export const useAdapter = () => {
  const [adapter] = useState(() => new (ENVIRONMENT === "test" ? FakeAdapter : LiveAdapter)());
  return adapter;
};

export const useElement = (adapter: IAdapter, type: "card") => {
  const [element] = useState(() => adapter.element(type));
  return element;
};
