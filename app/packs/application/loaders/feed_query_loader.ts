import { FeedDocument, type FeedQuery, type FeedQueryVariables } from "@root/app_schema";

import { CLIENT } from "@application/config/apollo";

export const FEED_QUERY_LOADER = async () => {
  const { data } = await CLIENT.query<FeedQuery, FeedQueryVariables>({
    query: FeedDocument,
  });

  return data;
};
