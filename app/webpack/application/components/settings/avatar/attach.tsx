import * as React from "react";
import { useContext } from "react";
import { useMutation } from "react-apollo";

import { Status } from "@application/types";

import { World } from "@application/contexts";

import { Uploader } from "@application/components/uploader";

import * as MUTATION from "./attach/mutation.gql";

interface IMutationData {
  attachAvatar: {
    status: Status;
  };
}

interface IMutationVariables {
  id: string;
}

export const Attach: React.FC<{
  onSave(): void;
}> = ({
  onSave,
}) => {
  const { notify } = useContext(World);
  const [submit, { loading }] = useMutation<IMutationData, IMutationVariables>(MUTATION);

  const onSelect = async (id: string) => {
    if (loading) { return; }
    await submit({ variables: { id } });
    notify({
      kind: "alert",
      message: "Your avatar has been saved.",
    });
    onSave();
  };

  return (
    <Uploader name="avatar" onSelect={onSelect} />
  );
};
