import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import { Notification, useDestroyNotificationMutation } from "@root/app_schema";

import { Button, Icon } from "tights";

export const Destroy: React.FC<{
  notification: Notification;
}> = ({ notification }) => {
  const variables = { id: notification.id };
  const [submit, { loading }] = useDestroyNotificationMutation({ variables });

  const onClick = async () => {
    if (loading) {
      return;
    }
    await submit();
  };

  return (
    <Button rounded loading={loading} onClick={onClick}>
      <Icon>
        <FontAwesomeIcon icon={faTimes} />
      </Icon>
      <span>Clear</span>
    </Button>
  );
};
