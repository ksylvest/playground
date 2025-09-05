import React, { useContext } from "react";
import { useState } from "react";

import { useMutation } from "@apollo/client/react";

import { LoginDocument, LoginInput } from "@root/app_schema";
import { World } from "@root/application/contexts/world";

import { Context } from "./context";

export const Form: React.FC<{
  children?: React.ReactNode;
  onAuth?(): void;
}> = ({ onAuth, children }) => {
  const { auth } = useContext(World);

  const [input, setInput] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [submit, { loading, data }] = useMutation(LoginDocument);
  const errors = data?.login.errors || undefined;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    const result = await submit({ variables: { input } });
    const token = result.data?.login?.token;
    if (token) {
      auth(token);
      if (onAuth) onAuth();
    }
  };

  return (
    <Context.Provider value={{ input, errors, loading, onChange: setInput }}>
      <form onSubmit={onSubmit} children={children} />
    </Context.Provider>
  );
};
