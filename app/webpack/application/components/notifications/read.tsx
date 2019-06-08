import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useMutation } from "urql";

import { INotification, Status } from "@application/types";

import {
  Button,
  Icon,
} from "@application/components/bulma";

import * as MUTATION from "./read/mutation.gql";

interface IMutationData {
  readNotification: {
    status: Status;
  };
}

interface IMutationVariables {
  id: string;
}

export const Read: React.FC<{
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
    <Button rounded disabled={fetching || notification.read} loading={fetching} onClick={onClick}>
      <Icon>
        <FontAwesomeIcon icon={notification.read ? "circle" : "check"} />
      </Icon>
      <span>Read</span>
    </Button>
  );
};
