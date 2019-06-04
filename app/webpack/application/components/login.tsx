import * as React from "react";
import { useContext } from "react";
import { Mutation } from "react-apollo";

import { Context } from "./context";

import { Fields } from "./login/fields";

import {
  IErrors,
  ISession,
  Status,
} from "@application/types";

import * as MUTATION from "./login/mutation.gql";

interface IMutationData {
  login: {
    status: Status;
    session?: ISession;
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
    <Mutation<IMutationData, IMutationVariables>
      mutation={MUTATION}
      children={(submit, { loading, data }) => (
        <Fields
          save={async (input) => {
            const result = await submit({ variables: { input } });
            if (!result || !result.data) { return; }
            if (!result.data.login.session) { return; }
            auth(result.data.login.session);
          }}
          loading={loading}
          errors={data && data.login ? data.login.errors : undefined}
        />
      )}
    />
  );
};
