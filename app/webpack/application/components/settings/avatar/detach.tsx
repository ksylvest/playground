import * as React from "react";
import {
  useContext,
  useState,
} from "react";
import { useMutation } from "react-apollo";

import { Status } from "@application/types";

import { Button } from "@application/components/bulma";
import { Context } from "@application/components/context";

import { Dialog } from "./detach/dialog";

import * as MUTATION from "./detach/mutation.gql";

interface IMutationData {
  detachAvatar: {
    status: Status;
  };
}

const DEFAULT_ACTIVE = false;

export const Detach: React.FC<{
  onSave(): void;
}> = ({
  onSave,
}) => {
  const { notify } = useContext(Context);
  const [active, setActive] = useState<boolean>(DEFAULT_ACTIVE);
  const [submit, { loading }] = useMutation<IMutationData>(MUTATION);

  const open = () => setActive(true);
  const close = () => setActive(false);

  const onCancel = () => {
    if (loading) { return; }
    close();
  };

  const onContinue = async () => {
    if (loading) { return; }
    await submit();
    close();
    notify({
      kind: "alert",
      message: "Your avatar has been reset.",
    });
    onSave();
  };

  return (
    <>
      <Button outlined fullwidth color="danger" onClick={open}>Clear</Button>
      {active && <Dialog loading={loading} onContinue={onContinue} onCancel={onCancel} />}
    </>
  );
};
