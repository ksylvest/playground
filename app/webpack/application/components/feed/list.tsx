import * as React from "react";

import { useFeedQuery } from "@root/app_schema";

import { Column, Columns } from "tights";

import { Title } from "@application/components/helpers";

import { Entry } from "./entry";

export const List: React.FC = () => {
  const { data } = useFeedQuery();
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
