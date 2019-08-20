import * as React from "react";
import { useContext } from "react";
import { useMutation } from "react-apollo";

import {
  IBillingSource,
  Status,
} from "@application/types";

import { Context } from "@application/components/context";

import { Dialog } from "./destroy/dialog";

import * as MUTATION from "./destroy/mutation.gql";

interface IMutationVariables {
  id: string;
}

interface IMutationData {
  destroyBillingSource: {
    status: Status;
  };
}

export const Destroy: React.FC<{
  source: IBillingSource;
  onClose(): void;
}> = ({
  source,
  onClose,
}) => {
  const { notify } = useContext(Context);
  const variables = { id: source.id };
  const [submit, { loading }] = useMutation<IMutationData, IMutationVariables>(MUTATION, { variables });

  const onContinue = async () => {
    if (loading) { return; }
    await submit();
    onClose();
    notify({
      kind: "alert",
      message: `"•••• ${source.number}" is removed.`,
    });
  };

  return (
    <Dialog
      source={source}
      loading={loading}
      onContinue={onContinue}
      onCancel={onClose}
    />
  );
};
