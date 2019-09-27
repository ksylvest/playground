import * as React from "react";
import { useParams } from "react-router";

import { useProfileQuery } from "@root/app_schema";

import { Title } from "@application/components/helpers";

import { Entries } from "./feed/entries";
import { Breadcrumbs } from "./profile/breadcrumbs";
import { Summary } from "./profile/summary";

export const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useProfileQuery({ variables: { id } });
  const user = data && data.user;
  const entries = user && user.feed.entries;

  return (
    <>
      <Title>Profile | Playground</Title>
      <Breadcrumbs id={id} />
      <Summary profile={user} />
      {entries && <Entries entries={entries} />}
    </>
  );
};
