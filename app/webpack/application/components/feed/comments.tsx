import * as React from "react";
import { useState } from "react";

import { Button, Form } from "tights";

import { useAuthentication } from "@application/hooks";

import { Comment } from "./comments/comment";

import { Status, useBuildFeedCommentMutation, useFeedCommentsQuery } from "@root/app_schema";

export const Comments: React.FC<{
  entryID: string;
}> = ({ entryID }) => {
  const [message, setMessage] = useState<string>("");
  const { data, refetch } = useFeedCommentsQuery({
    variables: { id: entryID },
  });
  const [execute, { loading }] = useBuildFeedCommentMutation({
    onCompleted: ({ result }) => {
      if (result?.status === Status.Ok) {
        refetch();
        setMessage("");
      }
    },
    variables: { input: { entryID, message } },
  });
  const save = useAuthentication({ action: execute });
  const comments = data?.feed?.entry.comments;
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
      {comments?.map((comment) => <Comment key={comment.id} comment={comment} />)}
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
