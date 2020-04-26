import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import { Notification, useReadNotificationMutation } from "@root/app_schema";

import { Button, Icon } from "tights";

export const Read: React.FC<{
  notification: Notification;
}> = ({ notification: { id, read } }) => {
  const [submit, { loading }] = useReadNotificationMutation({ variables: { id } });

  const onClick = async (): Promise<void> => {
    if (loading) {
      return;
    }
    await submit();
  };

  return (
    <Button outlined rounded disabled={read} loading={loading} onClick={onClick}>
      <Icon>
        <FontAwesomeIcon icon={read ? faCircle : faCheck} />
      </Icon>
      <span>Read</span>
    </Button>
  );
};
