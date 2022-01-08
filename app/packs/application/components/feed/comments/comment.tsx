import * as React from "react";

import { Content, Media } from "tights";

import { Feed__CommentFragment } from "@root/app_schema";

import { Age, Attachment } from "@application/components/helpers";

const PLACEHOLDER = "/avatar/placeholder.svg";

export const Comment: React.FC<{
  comment: Feed__CommentFragment;
}> = ({ comment }) => {
  const user = comment.user;
  const avatar = user.avatar;

  return (
    <Media>
      <Media.Left>
        <Attachment
          attachment={avatar}
          placeholder={PLACEHOLDER}
          rounded
          square
          dimensions={48}
          w={48}
          h={48}
          alt={user.name}
        />
      </Media.Left>
      <Media.Content>
        <Content>
          <p>
            <strong>{comment.user.name}</strong>{" "}
            <span>
              <Age datetime={comment.sent} />
            </span>
            <br />
            {comment.message}
          </p>
        </Content>
      </Media.Content>
    </Media>
  );
};
