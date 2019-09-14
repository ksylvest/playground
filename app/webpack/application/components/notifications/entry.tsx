import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import * as React from "react";

import { Buttons, Column, Columns, Icon, Message } from "tights";

import { Notification } from "@root/app_schema";

import { Destroy } from "./destroy";
import { Read } from "./read";

export const Entry: React.FC<{
  notification: Notification;
}> = ({ notification }) => {
  const color = notification.read ? "light" : "info";
  return (
    <Message color={color}>
      <Message.Body>
        <Columns mobile desktop vcentered>
          <Column narrow>
            <Icon color={color}>
              <FontAwesomeIcon icon={faCircle} />
            </Icon>
          </Column>
          <Column>
            <small>{DateTime.fromISO(notification.sent).toLocaleString(DateTime.DATETIME_MED)}</small>
            <p>{notification.message}</p>
          </Column>
          <Column narrow>
            <Buttons addons>
              <Read notification={notification} />
              <Destroy notification={notification} />
            </Buttons>
          </Column>
        </Columns>
      </Message.Body>
    </Message>
  );
};
