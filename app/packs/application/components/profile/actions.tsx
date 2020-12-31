import * as React from "react";

import { Buttons } from "tights";

import { FollowFragment, UserFragment } from "@root/app_schema";

import { Follow } from "./follow";

export const Actions: React.FC<{
  profile?: FollowFragment & UserFragment;
}> = ({ profile }) => (
  <Buttons addons>
    <Follow profile={profile} />
  </Buttons>
);
