import * as React from "react";

import { Buttons } from "tights";

import { IFeedEntry } from "@application/types";

import { Like } from "./like";

export const Actions: React.FC<{
  entry?: IFeedEntry;
}> = ({ entry }) => (
  <Buttons addons>
    <Like entry={entry} />
  </Buttons>
);
