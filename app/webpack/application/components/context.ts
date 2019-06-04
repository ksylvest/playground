import { createContext } from "react";

import {
  IFlash,
  ISession,
} from "@application/types";

export const Context = createContext<{
  flash?: IFlash;
  session?: ISession;
  auth(session: ISession): void;
  deauth(): void;
  notify(flash?: IFlash): void;
}>({
  auth: (_: ISession) => { /* noop */ },
  deauth: () => { /* noop */ },
  notify: (_: IFlash) => { /* noop */ },
});
