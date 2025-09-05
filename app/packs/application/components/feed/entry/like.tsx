import { Button, Icon } from "tights";

import { useMutation } from "@apollo/client/react";

import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Feed__EntryFragment, LikeFeedEntryDocument, UnlikeFeedEntryDocument } from "@root/app_schema";

import { useAuthentication } from "@application/hooks/use_authentication";

const ON_COLOR = "hsl(348, 100%, 61%)";
const OFF_COLOR = "hsl(0, 0%, 48%)";

export const Like: React.FC<{
  entry?: Feed__EntryFragment;
}> = ({ entry }) => {
  const liked = entry?.liked;
  const likes = entry?.likes;
  const id = entry?.id;

  const [like, { loading: liking }] = useMutation(LikeFeedEntryDocument);
  const [unlike, { loading: unliking }] = useMutation(UnlikeFeedEntryDocument);

  const loading = liking || unliking;
  const execute = (): void => {
    if (!id) {
      throw new Error("undefined 'id'");
    }
    (liked ? unlike : like)({ variables: { id } });
  };

  const disabled = !id || loading;
  const title = liked ? "Like" : "Unlike";
  const onClick = useAuthentication({ action: execute });

  return (
    <Button title={title} disabled={disabled} onClick={onClick}>
      <Icon>
        <FontAwesomeIcon icon={faHeart} color={liked ? ON_COLOR : OFF_COLOR} />
      </Icon>
      <span>{likes !== undefined ? likes : "-"}</span>
    </Button>
  );
};
