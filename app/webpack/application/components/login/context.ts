import { createContext } from "react";

import { Errors, LoginInput } from "@root/app_schema";

export const Context = createContext<{
  input: LoginInput;
  errors?: Errors;
  loading: boolean;
  onChange(input: LoginInput): void;
}>({
  input: {
    email: "",
    password: "",
  },
  loading: false,
  onChange: () => {
    /* noop */
  },
});
