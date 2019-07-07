import * as React from "react";
import { useContext } from "react";
import { useMutation } from "react-apollo";
import { Helmet } from "react-helmet";

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
  const [submit, { loading, data }] = useMutation<IMutationData, IMutationVariables>(MUTATION);

  return (
    <>
      <Helmet>
        <title>Settings - Signup | Playground</title>
      </Helmet>

      <Fields
        save={async (input) => {
          if (loading) { return; }
          const result = await submit({ variables: { input } });
          if (!result || !result.data) { return; }
          if (!result.data.signup.session) { return; }
          auth(result.data.signup.session);
        }}
        loading={loading}
        errors={data && data.signup && data.signup.errors}
      />
    </>
  );
};
