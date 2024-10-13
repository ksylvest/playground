import { type LoaderFunctionArgs } from "react-router";

import { ProfileDocument, type ProfileQuery, type ProfileQueryVariables } from "@root/app_schema";

import { CLIENT } from "@application/config/apollo";

export const PROFILE_LOADER = async (props: LoaderFunctionArgs) => {
  const { data } = await CLIENT.query<ProfileQuery, ProfileQueryVariables>({
    query: ProfileDocument,
    variables: { id: props.params.id! },
  });

  return data;
};
