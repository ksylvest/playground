import * as React from "react";
import { useContext } from "react";
import { Mutation } from "react-apollo";

import {
  ISession,
  Status,
} from "@application/types";

import { Context } from "@application/components/context";

import { Dialog } from "./revoke/dialog";

import * as MUTATION from "./revoke/mutation.gql";

interface IMutationVariables {
  id: string;
}

interface IMutationData {
  destroySession: {
    status: Status;
  };
}

export const Revoke: React.FC<{
  session: ISession;
  onClose(): void;
}> = ({
  session,
  onClose,
}) => {
  const { notify } = useContext(Context);

  return (
    <Mutation<IMutationData, IMutationVariables>
      mutation={MUTATION}
      variables={{ id: session.id }}
      children={(submit, { loading }) => (
        <Dialog
          session={session}
          loading={loading}
          onContinue={async () => {
            await submit();
            onClose();
            notify({
              kind: "alert",
              message: `The session "${session.ip}" is revoked.`,
            });
          }}
          onCancel={onClose}
        />
      )}
    />
  );
};
