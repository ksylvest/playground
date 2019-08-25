import * as React from "react";
import { useQuery } from "react-apollo";

import { Title } from "@application/components/helpers";

import { List } from "./feed/list";

import { IFeed } from "@application/types";

import * as QUERY from "./feed/query.gql";

interface IQueryData {
  feed: IFeed;
}

export const Feed: React.FC = () => {
  const { data } = useQuery<IQueryData>(QUERY);
  return (
    <>
      <Title>Feed | Playground</Title>

      <h2 className="title">Feed</h2>
      <hr />
      {data && data.feed && <List entries={data.feed.entries} />}
    </>
  );
};
