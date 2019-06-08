import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useMutation } from "urql";

import { INotification, Status } from "@application/types";

import {
  Button,
  Icon,
} from "@application/components/bulma";

import * as MUTATION from "./destroy/mutation.gql";

interface IMutationData {
  destroyNotification: {
    status: Status;
  };
}

interface IMutationVariables {
  id: string;
}

export const Destroy: React.FC<{
  notification: INotification;
  onChange(): void;
}> = ({
  notification,
  onChange,
}) => {
  const [{ fetching }, submit] = useMutation<IMutationData, IMutationVariables>(MUTATION);
  const onClick = async () => {
    await submit({ id: notification.id });
    onChange();
  };

  return (
    <Button rounded disabled={fetching} loading={fetching} onClick={onClick}>
      <Icon>
        <FontAwesomeIcon icon="times" />
      </Icon>
      <span>Clear</span>
    </Button>
  );
};
