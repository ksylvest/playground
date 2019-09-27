import { head } from "lodash";
import * as React from "react";
import { Link } from "react-router-dom";

import { Card, Column, Columns } from "tights";

import { Feed__EntryFragment } from "@root/app_schema";

import { Actions } from "./entry/actions";

import { Attachment } from "@application/components/helpers";

import { FEED_DETAILS_URL, PROFILE_URL } from "@application/config/routes";

import PLACEHOLDER from "@application/assets/avatar/placeholder.svg";

export const Entry: React.FC<{
  entry: Feed__EntryFragment;
}> = ({ entry }) => (
  <Card>
    <Card.Image>
      <Link to={FEED_DETAILS_URL(entry)}>
        <Attachment square attachment={head(entry.photos)} w={320} h={320} />
      </Link>
    </Card.Image>
    <Card.Content>
      <Columns desktop tablet mobile vcentered gap={2}>
        <Column narrow>
          <Link to={PROFILE_URL(entry.user)}>
            <Attachment rounded w={32} h={32} attachment={entry.user.avatar} placeholder={PLACEHOLDER} />
          </Link>
        </Column>
        <Column>
          <Link to={PROFILE_URL(entry.user)}>{entry.user.name}</Link>
        </Column>
        <Column narrow>
          <Actions entry={entry} />
        </Column>
      </Columns>
    </Card.Content>
  </Card>
);
