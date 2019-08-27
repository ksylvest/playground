import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useMutation } from "react-apollo";

import { IFeedEntry, Status } from "@application/types";

import {
  Button,
  Icon,
} from "@application/components/bulma";

import * as LIKE_MUTATION from "./like.gql";
import * as UNLIKE_MUTATION from "./unlike.gql";

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

export const Action: React.FC<{
  entry: IFeedEntry;
}> = ({
  entry: {
    id,
    liked,
    likes,
  },
}) => {
  const MUTATION = liked ? UNLIKE_MUTATION : LIKE_MUTATION;
  const [execute, { loading }] = useMutation<IMutationData, IMutationVariables>(MUTATION, {
    variables: { id },
  });

  const onClick = async () => {
    await execute();
  };

  return (
    <Button title={liked ? "Like" : "Unlike"} color="white" disabled={loading} onClick={onClick}>
      <Icon>
        <FontAwesomeIcon icon="heart" color={liked ? ON_COLOR : OFF_COLOR} />
      </Icon>
      <span>{likes}</span>
    </Button>
  );
};
