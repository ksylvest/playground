import { head } from "lodash";
import * as React from "react";
import { Link } from "react-router-dom";

import { Card, Column, Columns, Image } from "tights";

import { IFeedEntry } from "@application/types";

import { Actions } from "./entry/actions";

import { ATTACHMENT_URL, FEED_DETAILS_URL } from "@application/config/routes";

export const Entry: React.FC<{
  entry: IFeedEntry;
}> = ({ entry }) => {
  const hero = head(entry.photos)!;
  const avatar = entry.user.avatar;

  const heroURL = ATTACHMENT_URL(hero.id, 640, 640, "fill");
  const avatarURL = avatar
    ? ATTACHMENT_URL(avatar.id, 64, 64, "fill")
    : require("@application/assets/avatar/placeholder.svg");

  return (
    <Card>
      <Card.Image>
        <Link to={FEED_DETAILS_URL(entry)}>{hero && <Image square src={heroURL} />}</Link>
      </Card.Image>
      <Card.Content>
        <Columns desktop tablet mobile vcentered gap={2}>
          <Column narrow>
            <Image rounded square dimensions={32} src={avatarURL} />
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
