import { createContext } from "react";

import { ISession } from "@application/types";

export const Context = createContext<{
  session?: ISession;
  auth(session: ISession): void;
  deauth(): void;
}>({
  auth: (_: ISession) => { /* noop */ },
  deauth: () => { /* noop */ },
});
