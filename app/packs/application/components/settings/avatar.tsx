import { Column, Columns } from "tights";

import { useQuery } from "@apollo/client/react";

import { SettingsAvatarDocument } from "@root/app_schema";

import { Attachment } from "@application/components/helpers/attachment";
import { Title } from "@application/components/helpers/title";

import { Attach } from "./avatar/attach";
import { Detach } from "./avatar/detach";

const PLACEHOLDER = "/avatar/placeholder.svg";

export const Avatar: React.FC = () => {
  const { data, refetch } = useQuery(SettingsAvatarDocument);
  const me = data?.me;

  return (
    <>
      <Title>Settings - Avatar | Playground</Title>

      <h2 className="title">Avatar</h2>
      <hr />
      <Columns>
        <Column size={3}>
          <Attachment
            attachment={me?.avatar}
            placeholder={PLACEHOLDER}
            rounded
            square
            w={320}
            h={320}
            alt={me?.name ?? "Me"}
          />
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
