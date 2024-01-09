import head from "lodash/head";
import React from "react";
import { Link } from "react-router-dom";

import { Card, CardContent, CardImage, Column, Columns } from "tights";

import { Feed__EntryFragment } from "@root/app_schema";

import { Actions } from "./entry/actions";

import { Attachment } from "@application/components/helpers/attachment";

import { FEED_DETAILS_URL, PROFILE_URL } from "@application/config/routes";

const PLACEHOLDER = "/avatar/placeholder.svg";

export const Entry: React.FC<{
  entry: Feed__EntryFragment;
}> = ({ entry }) => (
  <Card>
    <CardImage>
      <Link to={FEED_DETAILS_URL(entry)}>
        <Attachment square attachment={head(entry.photos)} w={320} h={320} alt={`Photos by ${entry.user.name}`} />
      </Link>
    </CardImage>
    <CardContent>
      <Columns desktop tablet mobile vcentered gap={2}>
        <Column narrow>
          <Link to={PROFILE_URL(entry.user)}>
            <Attachment
              square
              rounded
              dimensions={32}
              w={32}
              h={32}
              attachment={entry.user.avatar}
              placeholder={PLACEHOLDER}
              alt={entry.user.name}
            />
          </Link>
        </Column>
        <Column>
          <Link to={PROFILE_URL(entry.user)}>{entry.user.name}</Link>
        </Column>
        <Column narrow>
          <Actions entry={entry} />
        </Column>
      </Columns>
    </CardContent>
  </Card>
);
