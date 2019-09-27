import * as React from "react";

import { Column, Columns, Title } from "tights";

import { FollowFragment, UserFragment } from "@root/app_schema";

import { Attachment } from "@application/components/helpers";

import { Actions } from "./actions";

import PLACEHOLDER from "@application/assets/avatar/placeholder.svg";

export const Summary: React.FC<{
  profile?: FollowFragment & UserFragment;
}> = ({ profile }) => {
  const name = profile && profile.name;
  const avatar = profile && profile.avatar;

  return (
    <>
      <Columns desktop tablet mobile vcentered gap={2}>
        <Column narrow>
          <Attachment rounded w={96} h={96} attachment={avatar} placeholder={PLACEHOLDER} />
        </Column>
        <Column>
          <Title>{name}</Title>
        </Column>
        <Column narrow>
          <Actions profile={profile} />
        </Column>
      </Columns>
    </>
  );
};
