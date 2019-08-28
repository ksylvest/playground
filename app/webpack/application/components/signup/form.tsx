import * as React from "react";
import { useState } from "react";
import { useMutation } from "react-apollo";

import {
  IErrors,
  ISession,
  Status,
} from "@application/types";

import { ISignupInput } from "@application/types";

import { Context } from "./context";

import * as MUTATION from "./mutation.gql";

interface IMutationData {
  signup: {
    status: Status;
    session?: ISession;
    errors?: IErrors;
  };
}

interface IMutationVariables {
  input: ISignupInput;
}

export const Form: React.FC<{
  onAuth(session: ISession): void;
}> = ({
  onAuth,
  children,
}) => {
  const [input, setInput] = useState<ISignupInput>({
    email: "",
    name: "",
    password: "",
  });
  const [submit, { loading, data }] = useMutation<IMutationData, IMutationVariables>(MUTATION);
  const errors = data && data.signup && data.signup.errors;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const result = await submit({ variables: { input } });
    if (result && result.data && result.data.signup.session) {
      onAuth(result.data.signup.session);
    }
  };

  return (
    <Context.Provider value={{ input, errors, loading, onChange: setInput }}>
      <form
        onSubmit={onSubmit}
        children={children}
      />
    </Context.Provider>
  );
};
