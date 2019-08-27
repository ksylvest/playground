import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useMutation } from "react-apollo";

import { INotification } from "@application/types";

import {
  Button,
  Icon,
} from "@application/components/bulma";

import * as MUTATION from "./destroy/mutation.gql";

interface IMutationData {
  destroyNotification: {
    notification: INotification;
  };
}

interface IMutationVariables {
  id: string;
}

export const Destroy: React.FC<{
  notification: INotification;
}> = ({
  notification,
}) => {
  const variables = { id: notification.id };
  const [submit, { loading }] = useMutation<IMutationData, IMutationVariables>(MUTATION, { variables });

  const onClick = async () => {
    if (loading) { return; }
    await submit();
  };

  return (
    <Button rounded loading={loading} onClick={onClick}>
      <Icon>
        <FontAwesomeIcon icon="times" />
      </Icon>
      <span>Clear</span>
    </Button>
  );
};
