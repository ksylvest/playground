import * as React from "react";

import { Notification } from "@root/app_schema";

import { Empty } from "./empty";
import { Entry } from "./entry";

export const List: React.FC<{
  notifications?: Notification[];
}> = ({ notifications }) => (
  <>
    {notifications &&
      notifications
        .filter(({ deleted }) => !deleted)
        .map((notification) => <Entry key={notification.id} notification={notification} />)}
    {notifications && !notifications.some(({ deleted }) => !deleted) && <Empty />}
  </>
);
