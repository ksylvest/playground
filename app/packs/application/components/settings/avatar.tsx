import * as React from "react";

import { Column, Columns } from "tights";

import { useSettingsAvatarQuery } from "@root/app_schema";

import { Attach } from "./avatar/attach";
import { Detach } from "./avatar/detach";

import { Attachment, Title } from "@application/components/helpers";

import PLACEHOLDER from "@application/assets/avatar/placeholder.svg";

export const Avatar: React.FC = () => {
  const { data, refetch } = useSettingsAvatarQuery();
  const avatar = data?.me?.avatar;

  return (
    <>
      <Title>Settings - Avatar | Playground</Title>

      <h2 className="title">Avatar</h2>
      <hr />
      <Columns>
        <Column size={3}>
          <Attachment attachment={avatar} placeholder={PLACEHOLDER} rounded square w={320} h={320} />
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
