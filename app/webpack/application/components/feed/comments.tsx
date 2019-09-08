import * as React from "react";
import { useState } from "react";
import { useMutation } from "react-apollo";
import { useQuery } from "react-apollo";

import { Button, Form } from "tights";

import { useAuthentication } from "@application/hooks";

import { IErrors, IFeedComment, IFeedCommentInput, Status } from "@application/types";

import { Comment } from "./comments/comment";

import * as MUTATION from "./comments/mutation.gql";
import * as QUERY from "./comments/query.gql";

interface IQueryData {
  feed: {
    entry: {
      comments: IFeedComment[];
    };
  };
}

interface IQueryVariables {
  id: string;
}

interface IMutationData {
  buildFeedComment: {
    status: Status;
    errors: IErrors;
    comment: IFeedComment;
  };
}

interface IMutationVariables {
  input: IFeedCommentInput;
}

export const Comments: React.FC<{
  entryID: string;
}> = ({ entryID }) => {
  const [message, setMessage] = useState<string>("");
  const { data, refetch } = useQuery<IQueryData, IQueryVariables>(QUERY, {
    variables: { id: entryID },
  });
  const [execute, { loading }] = useMutation<IMutationData, IMutationVariables>(MUTATION, {
    onCompleted: ({ buildFeedComment: { status } }) => {
      if (status === Status.OK) {
        refetch();
        setMessage("");
      }
    },
    variables: { input: { entryID, message } },
  });
  const save = useAuthentication({ action: execute });
  const comments = data && data.feed && data.feed.entry.comments;
  const valid = !!message || loading;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!valid) {
      return;
    }

    save();
  };

  return (
    <>
      {comments && comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Form.Control>
            <Form.Textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Add a comment..."
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Button loading={loading} disabled={!valid}>
              Comment
            </Button>
          </Form.Control>
        </Form.Field>
      </Form>
    </>
  );
};
