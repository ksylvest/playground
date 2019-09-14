import * as React from "react";

import { Content, Image, Media } from "tights";

import { Feed__CommentFragment } from "@root/app_schema";

import { Age } from "@application/components/helpers";

import { ATTACHMENT_URL } from "@application/config/routes";

export const Comment: React.FC<{
  comment: Feed__CommentFragment;
}> = ({ comment }) => {
  const avatar = comment.user.avatar;
  const avatarURL = avatar
    ? ATTACHMENT_URL(avatar.id, 96, 96, "fill")
    : require("@application/assets/avatar/placeholder.svg");

  return (
    <Media>
      <Media.Left>
        <Image rounded square dimensions={48} src={avatarURL} />
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
