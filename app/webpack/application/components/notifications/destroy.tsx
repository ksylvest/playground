import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Mutation } from "react-apollo";

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
}) => (
  <Mutation<IMutationData, IMutationVariables>
    variables={{ id: notification.id }}
    mutation={MUTATION}
    children={(save) => {
      const onClick = async () => {
        await save();
        onChange();
      };

      return (
        <Button rounded onClick={onClick}>
          <Icon>
            <FontAwesomeIcon icon="times" />
          </Icon>
          <span>Clear</span>
        </Button>
      );
    }}
  />
);
