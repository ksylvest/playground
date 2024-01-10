import { createContext } from "react";

import { Flash } from "@application/types/flash";
import { Stats } from "@application/types/stats";

export const World = createContext<{
  token?: string;
  flash?: Flash;
  stats?: Stats;
  auth(token: string): void;
  deauth(): void;
  notify(flash?: Flash): void;
}>({
  auth: (token: string) => {
    /* noop */
  },
  deauth: () => {
    /* noop */
  },
  notify: (_: Flash) => {
    /* noop */
  },
});
