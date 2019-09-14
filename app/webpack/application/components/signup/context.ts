import { createContext } from "react";

import { Errors, SignupInput } from "@root/app_schema";

export const Context = createContext<{
  input: SignupInput;
  errors?: Errors;
  loading: boolean;
  onChange(input: SignupInput): void;
}>({
  input: {
    email: "",
    name: "",
    password: "",
  },
  loading: false,
  onChange: () => {
    /* noop */
  },
});
