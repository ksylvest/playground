import { head } from "lodash";
import * as React from "react";

import { IFeedEntry } from "@application/types";

import {
  Card,
  Column,
  Columns,
  Image,
} from "@application/components/bulma";

export const Entry: React.FC<{
  entry: IFeedEntry;
  onSelect(entry: IFeedEntry): void;
}> = ({
  entry,
  onSelect,
}) => {
  const hero = head(entry.photos);
  const avatar = entry.user.avatar;

  return (
    <Card>
      <Card.Image>
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onSelect(entry);
          }}
        >
          {hero &&
            <Image
              square
              src={hero.url}
            />
          }
        </a>
      </Card.Image>
      <Card.Content>
        <Columns desktop tablet mobile vcentered gap={2}>
          <Column narrow>
            <Image
              rounded
              square
              dimensions={48}
              src={avatar ? avatar.url : require("@application/assets/avatar/placeholder.svg")}
            />
          </Column>
          <Column>
            <p>{entry.user.name}</p>
          </Column>
        </Columns>
      </Card.Content>
    </Card>
  );
};
