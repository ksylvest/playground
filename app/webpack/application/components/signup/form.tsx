import * as React from "react";
import { useState } from "react";

import { SignupInput, useSignupMutation } from "@root/app_schema";

import { Context } from "./context";

export const Form: React.FC<{
  onAuth(_: { id: string }): void;
}> = ({ onAuth, children }) => {
  const [input, setInput] = useState<SignupInput>({
    email: "",
    name: "",
    password: "",
  });
  const [submit, { loading, data }] = useSignupMutation();
  const errors = data?.signup?.errors || undefined;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const result = await submit({ variables: { input } });
    const session = result.data?.signup?.session;
    if (session) {
      onAuth(session);
    }
  };

  return (
    <Context.Provider value={{ input, errors, loading, onChange: setInput }}>
      <form onSubmit={onSubmit} children={children} />
    </Context.Provider>
  );
};
