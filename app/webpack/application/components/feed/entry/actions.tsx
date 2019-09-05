import * as React from "react";

import { Buttons } from "tights";

import { IFeedEntry } from "@application/types";

import { Like } from "./like";

export const Actions: React.FC<{
  entry?: IFeedEntry;
  outlined?: boolean;
}> = ({ entry, outlined }) => (
  <Buttons addons>
    <Like outlined={outlined} entry={entry} />
  </Buttons>
);
