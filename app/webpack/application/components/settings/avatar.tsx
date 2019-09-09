import * as React from "react";
import { useQuery } from "react-apollo";

import { Column, Columns, Image } from "tights";

import { Attach } from "./avatar/attach";
import { Detach } from "./avatar/detach";

import { Title } from "@application/components/helpers";

interface IQueryData {
  user: {
    id: string;
    avatar?: {
      id: string;
      url: string;
    };
  };
}

import * as QUERY from "./avatar/query.gql";

import { ATTACHMENT_URL } from "@application/config/routes";

export const Avatar: React.FC = () => {
  const { data, refetch } = useQuery<IQueryData>(QUERY);
  const avatar = data && data.user && data.user.avatar && data.user.avatar;
  const avatarURL = avatar
    ? ATTACHMENT_URL(avatar.id, 640, 640, "fill")
    : require("@application/assets/avatar/placeholder.svg");

  return (
    <>
      <Title>Settings - Avatar | Playground</Title>

      <h2 className="title">Avatar</h2>
      <hr />
      <Columns>
        <Column size={3}>
          <Image rounded square src={avatarURL} />
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
