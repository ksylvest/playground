import * as React from "react";
import { useQuery } from "urql";

import { INotification } from "@application/types";

import { List } from "./notifications/list";

import * as QUERY from "./notifications/query.gql";

interface IQueryData {
  notifications: INotification[];
}

export const Notifications: React.FC = () => {
  const [{ data }, refetch] = useQuery<IQueryData>({ query: QUERY });

  return (
    <>
      <h2 className="title">Notifications</h2>
      <hr />
      <List
        notifications={data ? data.notifications : undefined}
        onChange={refetch}
      />
    </>
  );
};
