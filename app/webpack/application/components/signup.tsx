import * as React from "react";
import { useContext } from "react";
import { Mutation } from "react-apollo";

import { Context } from "./context";

import { Form } from "./signup/form";

import {
  IErrors,
  IUser,
  Status,
} from "@application/types";

import * as MUTATION from "./signup/mutation.gql";

interface IMutationData {
  signup: {
    status: Status;
    user?: IUser;
    errors?: IErrors;
  };
}

interface IMutationVariables {
  input: {
    name: string;
    email: string;
    password: string;
  };
}

export const Signup: React.FC = () => {
  const { auth } = useContext(Context);
  return (
    <Mutation<IMutationData, IMutationVariables> mutation={MUTATION}>
      {(submit, { loading, data }) => (
        <Form
          save={async (input) => {
            const result = await submit({ variables: { input } });
            if (!result || !result.data) { return; }
            if (!result.data.signup.user) { return; }
            auth(result.data.signup.user);
          }}
          loading={loading}
          errors={data && data.signup ? data.signup.errors : undefined}
        />
      )}
    </Mutation>
  );
};
