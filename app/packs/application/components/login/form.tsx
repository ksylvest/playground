import * as React from "react";
import { useState } from "react";

import { LoginInput, useLoginMutation } from "@root/app_schema";

import { Context } from "./context";

export const Form: React.FC<{
  children?: React.ReactNode;
  onAuth(_: { id: string }): void;
}> = ({ onAuth, children }) => {
  const [input, setInput] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [submit, { loading, data }] = useLoginMutation();
  const errors = data?.login.errors || undefined;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    const result = await submit({ variables: { input } });
    const authentication = result.data?.login?.authentication;
    if (authentication) {
      onAuth(authentication);
    }
  };

  return (
    <Context.Provider value={{ input, errors, loading, onChange: setInput }}>
      <form onSubmit={onSubmit} children={children} />
    </Context.Provider>
  );
};
