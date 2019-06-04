import * as React from "react";
import { useContext } from "react";
import { Mutation } from "react-apollo";

import { Context } from "./context";

import { Fields } from "./signup/fields";

import {
  IErrors,
  ISession,
  Status,
} from "@application/types";

import * as MUTATION from "./signup/mutation.gql";

interface IMutationData {
  signup: {
    status: Status;
    session?: ISession;
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
    <Mutation<IMutationData, IMutationVariables>
      mutation={MUTATION}
      children={(submit, { loading, data }) => (
        <Fields
          save={async (input) => {
            const result = await submit({ variables: { input } });
            if (!result || !result.data) { return; }
            if (!result.data.signup.session) { return; }
            auth(result.data.signup.session);
          }}
          loading={loading}
          errors={data && data.signup ? data.signup.errors : undefined}
        />
      )}
    />
  );
};
