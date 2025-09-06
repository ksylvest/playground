import { useState } from "react";

import { Button, Control, Field, Textarea } from "tights";

import { useMutation, useQuery } from "@apollo/client/react";

import { BuildFeedCommentDocument, FeedCommentsDocument, Status } from "@root/app_schema";

import { useAuthentication } from "@application/hooks/use_authentication";

import { Comment } from "./comments/comment";

export const Comments: React.FC<{
  entryID: string;
}> = ({ entryID }) => {
  const [message, setMessage] = useState<string>("");
  const { data, refetch } = useQuery(FeedCommentsDocument, {
    variables: { id: entryID },
  });
  const [execute, { loading }] = useMutation(BuildFeedCommentDocument, {
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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    if (!valid) {
      return;
    }

    save();
  };

  return (
    <>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <form onSubmit={onSubmit}>
        <Field>
          <Control>
            <Textarea
              value={message}
              onChange={(event): void => setMessage(event.target.value)}
              placeholder="Add a comment..."
            />
          </Control>
        </Field>
        <Field>
          <Control>
            <Button loading={loading} disabled={!valid}>
              Comment
            </Button>
          </Control>
        </Field>
      </form>
    </>
  );
};
