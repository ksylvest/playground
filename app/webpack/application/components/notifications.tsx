import * as React from "react";
import { Query } from "react-apollo";

import { INotification } from "@application/types";

import { List } from "./notifications/list";

import * as QUERY from "./notifications/query.gql";

import { Authorize } from "./authorize";

interface IQueryData {
  notifications: INotification[];
}

export const Notifications: React.FC = () => (
  <Authorize>
    <h2 className="title">Notifications</h2>
    <hr />
    <Query<IQueryData>
      query={QUERY}
      children={({ data, refetch }) => (
        <List
          notifications={data ? data.notifications : undefined}
          onChange={refetch}
        />
      )}
    />
  </Authorize>
);
