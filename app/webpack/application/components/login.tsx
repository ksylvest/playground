import * as React from "react";
import { useContext } from "react";
import { useMutation } from "urql";

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
  const [{ data, fetching }, submit] = useMutation<IMutationData, IMutationVariables>(MUTATION);
  return (
    <Fields
      save={async (input) => {
        const result = await submit({ input });
        if (!result.data || !result.data.login.session) { return; }
        auth(result.data.login.session);
      }}
      loading={fetching}
      errors={data && data.login ? data.login.errors : undefined}
    />
  );
};
