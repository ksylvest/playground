import { History, Location } from "history";
import { createContext } from "react";

import { IFlash } from "@application/types";

export const World = createContext<{
  session?: { id: string };
  flash?: IFlash;
  history?: History;
  location?: Location;
  stats?: { notifications: number };
  auth(_: { id: string }): void;
  deauth(): void;
  notify(flash: IFlash): void;
}>({
  auth: (_: { id: string }) => {
    /* noop */
  },
  deauth: () => {
    /* noop */
  },
  notify: (_: IFlash) => {
    /* noop */
  },
});
