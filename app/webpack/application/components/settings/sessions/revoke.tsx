import * as React from "react";
import { useContext } from "react";
import { useMutation } from "react-apollo";

import { ISession, Status } from "@application/types";

import { World } from "@application/contexts";

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
}> = ({ session, onClose }) => {
  const { notify } = useContext(World);
  const variables = { id: session.id };
  const [submit, { loading }] = useMutation<IMutationData, IMutationVariables>(MUTATION, { variables });

  const onContinue = async () => {
    if (loading) {
      return;
    }
    await submit();
    onClose();
    notify({
      kind: "alert",
      message: `The session "${session.ip}" is revoked.`,
    });
  };

  return <Dialog session={session} loading={loading} onContinue={onContinue} onCancel={onClose} />;
};
