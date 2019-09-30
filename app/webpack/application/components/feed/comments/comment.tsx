import * as React from "react";

import { Content, Media } from "tights";

import { Feed__CommentFragment } from "@root/app_schema";

import { Age, Attachment } from "@application/components/helpers";

import PLACEHOLDER from "@application/assets/avatar/placeholder.svg";

export const Comment: React.FC<{
  comment: Feed__CommentFragment;
}> = ({ comment }) => {
  const avatar = comment.user.avatar;

  return (
    <Media>
      <Media.Left>
        <Attachment attachment={avatar} placeholder={PLACEHOLDER} rounded square w={48} h={48} />
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
