import { head } from "lodash";
import * as React from "react";
import { Link } from "react-router-dom";

import { Card, Column, Columns, Image } from "tights";

import { IFeedEntry } from "@application/types";

import { Actions } from "./entry/actions";

import { FEED_DETAILS_URL } from "@application/config/routes";

export const Entry: React.FC<{
  entry: IFeedEntry;
}> = ({ entry }) => {
  const hero = head(entry.photos);
  const avatar = entry.user.avatar;

  return (
    <Card>
      <Card.Image>
        <Link to={FEED_DETAILS_URL(entry)}>{hero && <Image square src={hero.url} />}</Link>
      </Card.Image>
      <Card.Content>
        <Columns desktop tablet mobile vcentered gap={2}>
          <Column narrow>
            <Image
              rounded
              square
              dimensions={32}
              src={avatar ? avatar.url : require("@application/assets/avatar/placeholder.svg")}
            />
          </Column>
          <Column>
            <p>{entry.user.name}</p>
          </Column>
          <Column narrow>
            <Actions entry={entry} />
          </Column>
        </Columns>
      </Card.Content>
    </Card>
  );
};
