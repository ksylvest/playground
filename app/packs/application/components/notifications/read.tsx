import { Button, Icon } from "tights";

import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Notification, useReadNotificationMutation } from "@root/app_schema";

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
