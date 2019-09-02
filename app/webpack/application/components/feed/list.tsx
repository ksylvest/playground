import * as React from "react";
import { useState } from "react";

import { Entry } from "./entry";
import { Lightbox } from "./lightbox";

import { IFeedEntry } from "@application/types";

import {
  Column,
  Columns,
} from "tights";

export const List: React.FC<{
  entries: IFeedEntry[];
}> = ({
  entries,
}) => {
  const [selection, setSelection] = useState<IFeedEntry | undefined>();

  return (
    <>
      <Columns multiline mobile tablet desktop>
        {entries && entries.map((entry) => (
          <Column key={entry.id} mobile={6} tablet={4} desktop={3}>
            <Entry entry={entry} onSelect={setSelection} />
          </Column>
        ))}
      </Columns>
      {selection && <Lightbox entry={selection} onClose={() => setSelection(undefined)} />}
    </>
  );
};
