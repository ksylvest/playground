import { createContext } from "react";

import { Flash } from "@application/types/flash";

export const World = createContext<{
  authentication?: { id: string };
  flash?: Flash;
  stats?: { notifications: number };
  auth(_: { id: string }): void;
  deauth(): void;
  notify(flash?: Flash): void;
}>({
  auth: (_: { id: string }) => {
    /* noop */
  },
  deauth: () => {
    /* noop */
  },
  notify: (_: Flash) => {
    /* noop */
  },
});
