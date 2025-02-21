import { Column, Columns, Title } from "tights";

import { FollowFragment, UserFragment } from "@root/app_schema";

import { Attachment } from "@application/components/helpers/attachment";

import { Actions } from "./actions";

const PLACEHOLDER = "/avatar/placeholder.svg";

export const Summary: React.FC<{
  profile?: FollowFragment & UserFragment;
}> = ({ profile }) => {
  const name = profile?.name;
  const avatar = profile?.avatar;

  return (
    <>
      <Columns desktop tablet mobile vcentered gap={2}>
        <Column narrow>
          {profile && (
            <Attachment
              square
              rounded
              dimensions={96}
              w={96}
              h={96}
              attachment={avatar}
              placeholder={PLACEHOLDER}
              alt={name}
            />
          )}
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
