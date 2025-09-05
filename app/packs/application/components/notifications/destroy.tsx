import { Button, Icon } from "tights";

import { useMutation } from "@apollo/client/react";

import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DestroyNotificationDocument, Notification } from "@root/app_schema";

export const Destroy: React.FC<{
  notification: Notification;
}> = ({ notification }) => {
  const variables = { id: notification.id };
  const [submit, { loading }] = useMutation(DestroyNotificationDocument, { variables });

  const onClick = async (): Promise<void> => {
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
