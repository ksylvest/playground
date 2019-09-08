import * as React from "react";

import { Content, Image, Media } from "tights";

import { Age } from "@application/components/helpers";

import { IFeedComment } from "@application/types";

export const Comment: React.FC<{
  comment: IFeedComment;
}> = ({ comment }) => {
  const avatar = comment.user.avatar;

  return (
    <Media>
      <Media.Left>
        <Image
          rounded
          square
          dimensions={48}
          src={avatar ? avatar.url : require("@application/assets/avatar/placeholder.svg")}
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
