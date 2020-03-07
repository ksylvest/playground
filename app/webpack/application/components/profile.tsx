import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router";

import { Button } from "tights";

import { useProfileQuery } from "@root/app_schema";

import { Breadcrumbs } from "@application/components/helpers";
import { Title } from "@application/components/helpers";

import { Entries } from "./feed/entries";
import { Summary } from "./profile/summary";

import { PROFILE_URL } from "@application/config/routes";

const DEMO_QUERY = gql`
  query Demo($id: ID!) {
    user(id: $id) {
      email
    }
  }
`;

const Demo: React.FC<{ id: string }> = ({ id }) => {
  const { data, loading } = useQuery(DEMO_QUERY, { variables: { id } });
  console.log("data", data);
  console.log("loading", loading);
  return <>DEMO!</>;
};

export const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useProfileQuery({ variables: { id } });
  const user = data?.user;
  const entries = user?.feed.entries;
  const [demo, setDemo] = useState<boolean>(false);

  return (
    <>
      <Title>Profile | Playground</Title>
      <Breadcrumbs links={[{ name: "Profile", to: PROFILE_URL({ id }) }]} />
      <Button type="button" onClick={() => setDemo(!demo)}>
        {demo ? "Hide" : "Show"}
      </Button>
      {demo && <Demo id={id} />}
      <Summary profile={user} />
      {entries && <Entries entries={entries} />}
    </>
  );
};
