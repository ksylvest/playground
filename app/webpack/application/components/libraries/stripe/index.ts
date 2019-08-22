import { useState } from "react";

export * from "./element";

declare const ENVIRONMENT: string;

import { Fake } from "./adapter/fake";
import { Live } from "./adapter/live";

export const useAdapter = () => {
  const [adapter] = useState(() => new (ENVIRONMENT === "test" ? Fake : Live)());
  return adapter;
};
