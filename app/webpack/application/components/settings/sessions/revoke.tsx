import * as React from "react";
import { useContext } from "react";
import { useMutation } from "urql";

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
  const [{ fetching }, submit] = useMutation<IMutationData, IMutationVariables>(MUTATION);

  const onContinue = async () => {
    await submit({ id: session.id });
    onClose();
    notify({
      kind: "alert",
      message: `The session "${session.ip}" is revoked.`,
    });
  };

  return (
    <Dialog
      session={session}
      loading={fetching}
      onContinue={onContinue}
      onCancel={onClose}
    />
  );
};
