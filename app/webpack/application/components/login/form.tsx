import * as React from "react";
import { useState } from "react";

import { LoginInput, useLoginMutation } from "@root/app_schema";

import { Context } from "./context";

export const Form: React.FC<{
  onAuth(_: { id: string }): void;
}> = ({ onAuth, children }) => {
  const [input, setInput] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [submit, { loading, data }] = useLoginMutation();
  const errors = data?.login?.errors || undefined;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const result = await submit({ variables: { input } });
    const session = result.data?.login?.session;
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
