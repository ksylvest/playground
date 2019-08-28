import { createContext } from "react";

import {
  IErrors,
  ISignupInput,
} from "@application/types";

export const Context = createContext<{
  input: ISignupInput;
  errors?: IErrors;
  loading: boolean;
  onChange(input: ISignupInput): void;
}>({
  input: {
    email: "",
    name: "",
    password: "",
  },
  loading: false,
  onChange: () => { /* noop */ },
});
