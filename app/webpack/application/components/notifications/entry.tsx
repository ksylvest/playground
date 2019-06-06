import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import * as React from "react";

import {
  Buttons,
  Colors,
  Column,
  Columns,
  Message,
} from "@application/components/bulma";

import { Destroy } from "./destroy";
import { Read } from "./read";

import { INotification } from "@application/types";

export const Entry: React.FC<{
  notification: INotification;
  onChange(): void;
}> = ({
  notification,
  onChange,
}) => {
  const color = notification.read ? "light" : "info";
  return (
    <Message color={color}>
      <Message.Body>
        <Columns mobile desktop vcentered>
          <Column narrow>
            <Colors text={color}>
              <FontAwesomeIcon icon="circle" />
            </Colors>
          </Column>
          <Column>
            <small>{DateTime.fromISO(notification.sent).toLocaleString(DateTime.DATETIME_MED)}</small>
            <p>{notification.message}</p>
          </Column>
          <Column narrow>
            <Buttons addons>
              <Read notification={notification} onChange={onChange} />
              <Destroy notification={notification} onChange={onChange} />
            </Buttons>
          </Column>
        </Columns>
      </Message.Body>
    </Message>
  );
};
