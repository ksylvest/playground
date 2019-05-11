import { createContext } from "react";

import { IUser } from "../types";

export const Context = createContext<{
  user?: IUser;
  auth(user: IUser): void;
  deauth(): void;
}>({
  auth: (_: IUser) => { /* noop */ },
  deauth: () => { /* noop */ },
});
