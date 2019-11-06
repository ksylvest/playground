import * as React from "react";

import { useNotificationsQuery } from "@root/app_schema";

import { Title } from "@application/components/helpers";

import { List } from "./notifications/list";

export const Notifications: React.FC = () => {
  const { data } = useNotificationsQuery();

  return (
    <>
      <Title>Notifications | Playground</Title>

      <h2 className="title">Notifications</h2>
      <hr />
      <List notifications={data?.notifications} />
    </>
  );
};
