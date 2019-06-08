import * as React from "react";
import { useContext } from "react";
import { useMutation } from "urql";

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
  const [{ data, fetching }, submit] = useMutation<IMutationData, IMutationVariables>(MUTATION);
  return (
    <Fields
      save={async (input) => {
        const result = await submit({ input });
        if (!result.data || !result.data.signup.session) { return; }
        auth(result.data.signup.session);
      }}
      loading={fetching}
      errors={data && data.signup ? data.signup.errors : undefined}
    />
  );
};
