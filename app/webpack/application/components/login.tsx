import * as React from "react";
import { useContext } from "react";
import { Mutation } from "react-apollo";

import { Context } from "./context";

import { Form } from "./login/form";

import {
  IErrors,
  IUser,
  Status,
} from "@application/types";

import * as MUTATION from "./login/mutation.gql";

interface IMutationData {
  login: {
    status: Status;
    user?: IUser;
    errors?: IErrors;
  };
}

interface IMutationVariables {
  input: {
    email: string;
    password: string;
  };
}

export const Login: React.FC = () => {
  const { auth } = useContext(Context);
  return (
    <Mutation<IMutationData, IMutationVariables> mutation={MUTATION}>
      {(submit, { loading, data }) => (
        <Form
          save={async (input) => {
            const result = await submit({ variables: { input } });
            if (!result || !result.data) { return; }
            if (!result.data.login.user) { return; }
            auth(result.data.login.user);
          }}
          loading={loading}
          errors={data && data.login ? data.login.errors : undefined}
        />
      )}
    </Mutation>
  );
};
