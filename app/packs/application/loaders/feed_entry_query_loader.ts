import { type LoaderFunctionArgs } from "react-router";

import { FeedEntryDocument, type FeedEntryQuery, type FeedEntryQueryVariables } from "@root/app_schema";

import { CLIENT } from "@application/config/apollo";

export const FEED_ENTRY_QUERY_LOADER = async (props: LoaderFunctionArgs) => {
  const { data } = await CLIENT.query<FeedEntryQuery, FeedEntryQueryVariables>({
    query: FeedEntryDocument,
    variables: { id: props.params.id! },
  });

  return data;
};
