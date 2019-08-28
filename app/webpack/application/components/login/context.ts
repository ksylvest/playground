import { createContext } from "react";

import {
  IErrors,
  ILoginInput,
} from "@application/types";

export const Context = createContext<{
  input: ILoginInput;
  errors?: IErrors;
  loading: boolean;
  onChange(input: ILoginInput): void;
}>({
  input: {
    email: "",
    password: "",
  },
  loading: false,
  onChange: () => { /* noop */ },
});
