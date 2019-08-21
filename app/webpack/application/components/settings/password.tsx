import * as React from "react";
import { useContext } from "react";
import { useMutation } from "react-apollo";

import { Title } from "@application/components/helpers";

import { IErrors, Status } from "@application/types";

import { Context } from "@application/components/context";

import { Fields } from "./password/fields";

import * as MUTATION from "./password/mutation.gql";

interface IMutationData {
  changePassword: {
    status: Status;
    errors: IErrors
  };
}

interface IMutationVariables {
  input: {
    current: string;
    replacement: string;
  };
}

export const Password: React.FC = () => {
  const { notify } = useContext(Context);
  const [submit, { loading, data }] = useMutation<IMutationData, IMutationVariables>(MUTATION);

  return (
    <>
      <Title>Settings - Password | Playground</Title>

      <h2 className="title">Password</h2>
      <hr />
      <Fields
        loading={loading}
        errors={data && data.changePassword && data.changePassword.errors}
        save={async (input) => {
          if (loading) { return; }
          const result = await submit({
            variables: { input },
          });
          if (!result || !result.data || result.data.changePassword.status !== Status.OK) { return; }
          notify({
            kind: "notice",
            message: "Your password has been saved.",
          });
        }}
      />
    </>
  );
};
