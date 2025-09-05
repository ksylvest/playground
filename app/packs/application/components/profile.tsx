import { useParams } from "react-router";

import { useQuery } from "@apollo/client/react";

import { ProfileDocument } from "@root/app_schema";

import { PROFILE_URL } from "@application/config/routes";

import { Breadcrumbs } from "@application/components/helpers/breadcrumbs";
import { Title } from "@application/components/helpers/title";

import { Entries } from "./feed/entries";
import { Summary } from "./profile/summary";

export const Profile: React.FC = () => {
  const { id } = useParams();
  if (!id) throw new Error('missing required "id"');

  const { data } = useQuery(ProfileDocument, { variables: { id } });
  const user = data?.user;
  const entries = user?.feed.entries;

  return (
    <>
      <Title>Profile | Playground</Title>
      <Breadcrumbs links={[{ name: "Profile", to: PROFILE_URL({ id }) }]} />
      <Summary profile={user} />
      {entries && <Entries entries={entries} />}
    </>
  );
};
