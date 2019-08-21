import * as React from "react";
import { useQuery } from "react-apollo";

import { Title } from "@application/components/helpers";

import { INotification } from "@application/types";

import { List } from "./notifications/list";

import * as QUERY from "./notifications/query.gql";

interface IQueryData {
  notifications: INotification[];
}

export const Notifications: React.FC = () => {
  const { data, refetch } = useQuery<IQueryData>(QUERY);
  const notifications = data ? data.notifications : undefined;

  return (
    <>
      <Title>Notifications | Playground</Title>

      <h2 className="title">Notifications</h2>
      <hr />
      <List
        notifications={notifications}
        onChange={refetch}
      />
    </>
  );
};
