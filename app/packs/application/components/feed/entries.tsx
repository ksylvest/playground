import * as React from "react";

import { Column, Columns } from "tights";

import { Entry } from "./entry";

import { Feed__EntryFragment } from "@root/app_schema";

export const Entries: React.FC<{
  entries: readonly Feed__EntryFragment[];
}> = ({ entries }) => (
  <Columns multiline mobile tablet desktop>
    {entries.map((entry) => (
      <Column key={entry.id} mobile={6} tablet={4} desktop={3}>
        <Entry entry={entry} />
      </Column>
    ))}
  </Columns>
);
