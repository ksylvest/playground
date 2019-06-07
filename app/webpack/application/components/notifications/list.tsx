import * as React from "react";

import { Empty } from "./empty";
import { Entry } from "./entry";

import { INotification } from "@application/types";

export const List: React.FC<{
  notifications?: INotification[];
  onChange(): void;
}> = ({
  notifications,
  onChange,
}) => (
  <>
    {notifications && notifications.map((notification) => (
      <Entry
        key={notification.id}
        notification={notification}
        onChange={onChange}
      />
    ))}
    {notifications && !notifications.length && <Empty />}
  </>
);
