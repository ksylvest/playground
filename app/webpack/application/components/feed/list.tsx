import * as React from "react";
import { useQuery } from "react-apollo";

import { Column, Columns } from "tights";

import { Title } from "@application/components/helpers";

import { Entry } from "./entry";

import { IFeed } from "@application/types";

import * as QUERY from "./list/query.gql";

interface IQueryData {
  feed: IFeed;
}

export const List: React.FC = () => {
  const { data } = useQuery<IQueryData>(QUERY);
  const entries = data && data.feed && data.feed.entries;

  return (
    <>
      <Title>Feed | Playground</Title>

      <Columns multiline mobile tablet desktop>
        {entries &&
          entries.map((entry) => (
            <Column key={entry.id} mobile={6} tablet={4} desktop={3}>
              <Entry entry={entry} />
            </Column>
          ))}
      </Columns>
    </>
  );
};
