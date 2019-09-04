import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useMutation } from "react-apollo";

import { IFeedEntry, Status } from "@application/types";

import {
  Button,
  Icon,
} from "tights";

import * as LIKE_MUTATION from "./like.gql";
import * as UNLIKE_MUTATION from "./unlike.gql";

import { useAuthentication } from "@application/hooks";

interface IMutationData {
  result: {
    status: Status;
  };
}

interface IMutationVariables {
  id: string;
}

const ON_COLOR = "hsl(348, 100%, 61%)";
const OFF_COLOR = "hsl(0, 0%, 48%)";

export const Like: React.FC<{
  entry?: IFeedEntry;
  outlined?: boolean;
}> = ({
  entry,
  outlined,
}) => {
  const liked = entry && entry.liked;
  const likes = entry && entry.likes;
  const id = entry && entry.id;

  const MUTATION = liked ? UNLIKE_MUTATION : LIKE_MUTATION;
  const [execute, { loading }] = useMutation<IMutationData, IMutationVariables>(MUTATION, {
    variables: { id: id! },
  });

  const disabled = !id || loading;
  const title = liked ? "Like" : "Unlike";
  const onClick = useAuthentication({ action: execute });

  return (
    <Button outlined={outlined} title={title} disabled={disabled} onClick={onClick}>
      <Icon>
        <FontAwesomeIcon icon="heart" color={liked ? ON_COLOR : OFF_COLOR} />
      </Icon>
      <span>{likes !== undefined ? likes : "-"}</span>
    </Button>
  );
};
