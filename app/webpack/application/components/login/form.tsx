import * as React from "react";
import { useState } from "react";
import { useMutation } from "react-apollo";

import { IErrors, ISession, Status } from "@application/types";

import { ILoginInput } from "@application/types";

import { Context } from "./context";

import * as MUTATION from "./mutation.gql";

interface IMutationData {
  login: {
    status: Status;
    session?: ISession;
    errors?: IErrors;
  };
}

interface IMutationVariables {
  input: ILoginInput;
}

export const Form: React.FC<{
  onAuth(session: ISession): void;
}> = ({ onAuth, children }) => {
  const [input, setInput] = useState<ILoginInput>({
    email: "",
    password: "",
  });
  const [submit, { loading, data }] = useMutation<IMutationData, IMutationVariables>(MUTATION);
  const errors = data && data.login && data.login.errors;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const result = await submit({ variables: { input } });
    if (result && result.data && result.data.login.session) {
      onAuth(result.data.login.session);
    }
  };

  return (
    <Context.Provider value={{ input, errors, loading, onChange: setInput }}>
      <form onSubmit={onSubmit} children={children} />
    </Context.Provider>
  );
};
