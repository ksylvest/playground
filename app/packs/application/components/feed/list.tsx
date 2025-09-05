import { useQuery } from "@apollo/client/react";

import { FeedDocument } from "@root/app_schema";

import { Title } from "@application/components/helpers/title";

import { Entries } from "./entries";

export const List: React.FC = () => {
  const { data } = useQuery(FeedDocument);
  const entries = data?.feed?.entries;

  return (
    <>
      <Title>Feed | Playground</Title>

      {entries && <Entries entries={entries} />}
    </>
  );
};
