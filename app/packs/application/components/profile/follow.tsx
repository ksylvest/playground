import { Button } from "tights";

import { useMutation } from "@apollo/client/react";

import { FollowFragment, FollowUserDocument, UnfollowUserDocument, UserFragment } from "@root/app_schema";

import { useAuthentication } from "@application/hooks/use_authentication";

export const Follow: React.FC<{
  profile?: FollowFragment & UserFragment;
}> = ({ profile }) => {
  const following = profile && profile.following;
  const id = profile?.id;

  const [follow, { loading: saving }] = useMutation(FollowUserDocument);
  const [unfollow, { loading: unsaving }] = useMutation(UnfollowUserDocument);

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
