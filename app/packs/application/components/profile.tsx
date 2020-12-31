import * as React from "react";
import { useParams } from "react-router";

import { useProfileQuery } from "@root/app_schema";

import { Breadcrumbs } from "@application/components/helpers";
import { Title } from "@application/components/helpers";

import { Entries } from "./feed/entries";
import { Summary } from "./profile/summary";

import { PROFILE_URL } from "@application/config/routes";

export const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useProfileQuery({ variables: { id } });
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
