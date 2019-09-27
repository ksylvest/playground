import * as React from "react";

import { Button } from "tights";

import { FollowFragment, useFollowUserMutation, UserFragment, useUnfollowUserMutation } from "@root/app_schema";

import { useAuthentication } from "@application/hooks";

export const Follow: React.FC<{
  profile?: FollowFragment & UserFragment;
}> = ({ profile }) => {
  const following = profile && profile.following;
  const id = profile && profile.id;
  const variables = { id: id! };

  const [follow, { loading: saving }] = useFollowUserMutation({ variables });
  const [unfollow, { loading: unsaving }] = useUnfollowUserMutation({ variables });

  const loading = saving || unsaving;
  const execute = following ? unfollow : follow;

  const disabled = !id || loading;
  const title = following ? "Following" : "Follow";
  const onClick = useAuthentication({ action: execute });

  return (
    <Button title={title} disabled={disabled} onClick={onClick}>
      {title}
    </Button>
  );
};
