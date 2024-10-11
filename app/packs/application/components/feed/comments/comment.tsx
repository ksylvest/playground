import { Content, Media, MediaContent, MediaLeft } from "tights";

import { Feed__CommentFragment } from "@root/app_schema";

import { Age } from "@application/components/helpers/age";
import { Attachment } from "@application/components/helpers/attachment";

const PLACEHOLDER = "/avatar/placeholder.svg";

export const Comment: React.FC<{
  comment: Feed__CommentFragment;
}> = ({ comment }) => {
  const user = comment.user;
  const avatar = user.avatar;

  return (
    <Media>
      <MediaLeft>
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
      </MediaLeft>
      <MediaContent>
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
      </MediaContent>
    </Media>
  );
};
