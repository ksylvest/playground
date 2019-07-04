import * as React from "react";
import { useContext } from "react";
import {
  useMutation,
  useQuery,
} from "react-apollo";

import { IErrors, Status } from "@application/types";

import { Context } from "@application/components/context";

import { Fields } from "./profile/fields";

interface IQueryData {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface IMutationData {
  changeProfile: {
    status: Status;
    errors?: IErrors;
  };
}

interface IMutationVariables {
  input: {
    name: string;
    email: string;
  };
}

import * as MUTATION from "./profile/mutation.gql";
import * as QUERY from "./profile/query.gql";

export const Profile: React.FC = () => {
  const { notify } = useContext(Context);
  const { data: defaults, loading: querying } = useQuery<IQueryData>(QUERY);
  const [submit, { data, loading: mutating }] = useMutation<IMutationData, IMutationVariables>(MUTATION);

  return (
    <>
      <h2 className="title">Profile</h2>
      <hr />
      <Fields
        defaults={defaults && defaults.user}
        save={async (input) => {
          if (querying || mutating) { return; }
          const result = await submit({ variables: { input } });
          if (!result || !result.data || result.data.changeProfile.status !== Status.OK) { return; }
          notify({
            kind: "notice",
            message: "Your profile has been saved.",
          });
        }}
        loading={querying || mutating}
        errors={data && data.changeProfile && data.changeProfile.errors}
      />
    </>
  );
};
