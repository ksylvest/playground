import { Buttons, Column, Columns, Icon, Message, MessageBody } from "tights";

import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Notification } from "@root/app_schema";

import { Age } from "@application/components/helpers/age";

import { Destroy } from "./destroy";
import { Read } from "./read";

export const Entry: React.FC<{
  notification: Notification;
}> = ({ notification }) => {
  const color = notification.read ? "light" : "info";
  return (
    <Message color={color}>
      <MessageBody>
        <Columns mobile desktop vcentered>
          <Column narrow>
            <Icon color={color}>
              <FontAwesomeIcon icon={faCircle} />
            </Icon>
          </Column>
          <Column>
            <small>
              <Age datetime={notification.sent} />
            </small>
            <p>{notification.message}</p>
          </Column>
          <Column narrow>
            <Buttons addons>
              <Read notification={notification} />
              <Destroy notification={notification} />
            </Buttons>
          </Column>
        </Columns>
      </MessageBody>
    </Message>
  );
};
