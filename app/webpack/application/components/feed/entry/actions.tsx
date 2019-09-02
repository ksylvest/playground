import * as React from "react";

import { Buttons } from "tights";

import { IFeedEntry } from "@application/types";

import { Action as LikeAction } from "./like/action";

export const Actions: React.FC<{
  entry: IFeedEntry;
}> = ({
  entry,
}) => (
  <Buttons addons>
    <LikeAction entry={entry} />
  </Buttons>
);
