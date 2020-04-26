import * as React from "react";

import { Button } from "tights";

import { FollowFragment, useFollowUserMutation, UserFragment, useUnfollowUserMutation } from "@root/app_schema";

import { useAuthentication } from "@application/hooks";

export const Follow: React.FC<{
  profile?: FollowFragment & UserFragment;
}> = ({ profile }) => {
  const following = profile && profile.following;
  const id = profile?.id;

  const [follow, { loading: saving }] = useFollowUserMutation();
  const [unfollow, { loading: unsaving }] = useUnfollowUserMutation();

  const loading = saving || unsaving;
  const execute = (): void => {
    if (!id) {
      throw new Error("undefined 'id'");
    }
    (following ? unfollow : follow)({ variables: { id } });
  };

  const disabled = !id || loading;
  const title = following ? "Following" : "Follow";
  const onClick = useAuthentication({ action: execute });

  return (
    <Button title={title} disabled={disabled} onClick={onClick}>
      {title}
    </Button>
  );
};
