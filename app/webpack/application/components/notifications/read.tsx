import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useMutation } from "react-apollo";

import { INotification } from "@application/types";

import {
  Button,
  Icon,
} from "tights";

import * as MUTATION from "./read/mutation.gql";

interface IMutationData {
  readNotification: {
    notification: INotification;
  };
}

interface IMutationVariables {
  id: string;
}

export const Read: React.FC<{
  notification: INotification;
}> = ({
  notification: {
    id,
    read,
  },
}) => {
  const [submit, { loading }] = useMutation<IMutationData, IMutationVariables>(MUTATION, { variables: { id } });

  const onClick = async () => {
    if (loading) { return; }
    await submit();
  };

  return (
    <Button outlined rounded disabled={read} loading={loading} onClick={onClick}>
      <Icon>
        <FontAwesomeIcon icon={read ? "circle" : "check"} />
      </Icon>
      <span>Read</span>
    </Button>
  );
};
