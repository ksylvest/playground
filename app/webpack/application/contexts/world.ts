import { History, Location } from "history";
import { createContext } from "react";

import { IFlash } from "@application/types";
import { ISession } from "@application/types";

export const World = createContext<{
  session?: ISession;
  flash?: IFlash;
  history?: History;
  location?: Location;
  stats?: { notifications: number };
  auth(_: ISession): void;
  deauth(): void;
  notify(flash: IFlash): void;
}>({
  auth: (_: ISession) => { /* noop */ },
  deauth: () => { /* noop */ },
  notify: (_: IFlash) => { /* noop */ },
});
