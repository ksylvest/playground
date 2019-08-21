import * as React from "react";
import { useQuery } from "react-apollo";
import { Title } from "@application/components/helpers";

import { Attach } from "./avatar/attach";
import { Detach } from "./avatar/detach";

import {
  Column,
  Columns,
  Image,
} from "@application/components/bulma";

interface IQueryData {
  user: {
    id: string;
    avatar?: {
      id: string;
      url: string;
    }
  };
}

import * as QUERY from "./avatar/query.gql";

export const Avatar: React.FC = () => {
  const { data, refetch } = useQuery<IQueryData>(QUERY);
  const avatarURL = data && data.user && data.user.avatar && data.user.avatar.url;

  return (
    <>
      <Title>Settings - Avatar | Playground</Title>

      <h2 className="title">Avatar</h2>
      <hr />
      <Columns>
        <Column size={3}>
          <Image rounded square src={avatarURL || require("@application/assets/avatar/placeholder.svg")} />
        </Column>
        <Column size={9}>
          <Attach onSave={refetch} />
          <hr />
          <Detach onSave={refetch} />
        </Column>
      </Columns>
    </>
  );
};
