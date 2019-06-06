import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Mutation } from "react-apollo";

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
}) => (
  <Mutation<IMutationData, IMutationVariables>
    variables={{ id: notification.id }}
    mutation={MUTATION}
    children={(save, { loading }) => {
      const onClick = async () => {
        await save();
        onChange();
      };

      return (
        <Button outlined rounded disabled={notification.read} loading={loading} onClick={onClick}>
          <Icon>
            <FontAwesomeIcon icon={notification.read ? "circle" : "check"} />
          </Icon>
          <span>Read</span>
        </Button>
      );
    }}
  />
);
