import * as React from "react";

import { Empty } from "./empty";
import { Entry } from "./entry";

import { INotification } from "@application/types";

export const List: React.FC<{
  notifications?: INotification[];
}> = ({ notifications }) => (
  <>
    {notifications &&
      notifications
        .filter(({ deleted }) => !deleted)
        .map((notification) => <Entry key={notification.id} notification={notification} />)}
    {notifications && !notifications.some(({ deleted }) => !deleted) && <Empty />}
  </>
);
