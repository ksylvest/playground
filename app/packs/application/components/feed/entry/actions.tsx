import * as React from "react";

import { Buttons } from "tights";

import { Feed__EntryFragment } from "@root/app_schema";

import { Like } from "./like";

export const Actions: React.FC<{
  entry?: Feed__EntryFragment;
}> = ({ entry }) => (
  <Buttons addons>
    <Like entry={entry} />
  </Buttons>
);
