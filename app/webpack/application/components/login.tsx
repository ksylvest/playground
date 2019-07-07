import * as React from "react";
import { useContext } from "react";
import { useMutation } from "react-apollo";
import { Helmet } from "react-helmet";

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
  const [submit, { loading, data }] = useMutation<IMutationData, IMutationVariables>(MUTATION);

  return (
    <>
      <Helmet>
        <title>Login | Playground</title>
      </Helmet>

      <Fields
        save={async (input) => {
          if (loading) { return; }
          const result = await submit({ variables: { input } });
          if (!result || !result.data) { return; }
          if (!result.data.login.session) { return; }
          auth(result.data.login.session);
        }}
        loading={loading}
        errors={data && data.login && data.login.errors}
      />
    </>
  );
};
