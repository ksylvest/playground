import * as React from "react";

import { useFeedQuery } from "@root/app_schema";

import { Title } from "@application/components/helpers";

import { Entries } from "./entries";

export const List: React.FC = () => {
  const { data } = useFeedQuery();
  const entries = data?.feed?.entries;

  return (
    <>
      <Title>Feed | Playground</Title>

      {entries && <Entries entries={entries} />}
    </>
  );
};
