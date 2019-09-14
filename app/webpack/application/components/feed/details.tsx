import * as React from "react";
import { Link } from "react-router-dom";

import { Breadcrumb, Card, Column, Columns, Image } from "tights";

import { useFeedEntryQuery } from "@root/app_schema";

import { Title } from "@application/components/helpers";

import { Comments } from "./comments";
import { Carousel } from "./details/carousel";

import { ATTACHMENT_URL, FEED_DETAILS_URL, FEED_LIST_URL } from "@application/config/routes";

import { Actions } from "./entry/actions";

const Breadcrumbs: React.FC<{ id: string }> = ({ id }) => (
  <Breadcrumb>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Link to={FEED_LIST_URL}>Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>
        <Link to={FEED_DETAILS_URL({ id })}>Details</Link>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb>
);

export const Details: React.FC<{
  id: string;
}> = ({ id }) => {
  const { data } = useFeedEntryQuery({ variables: { id } });
  const entry = data && data.feed && data.feed.entry;

  const photos = entry && entry.photos;
  const user = entry && entry.user;
  const avatar = user && user.avatar;
  const avatarURL = avatar
    ? ATTACHMENT_URL(avatar.id, 128, 128, "fill")
    : require("@application/assets/avatar/placeholder.svg");

  return (
    <>
      <Title>Feed - Details | Playground</Title>
      <Breadcrumbs id={id} />
      <Card>
        <Card.Content>
          <Columns>
            <Column>{photos && <Carousel photos={photos} />}</Column>
            <Column>
              <Columns desktop tablet mobile vcentered gap={2}>
                <Column narrow>
                  <Image rounded square dimensions={64} src={avatarURL} />
                </Column>
                <Column>
                  <span>by</span> <strong>{(user && user.name) || "-"}</strong>
                </Column>
                <Column narrow>
                  <Actions entry={entry} />
                </Column>
              </Columns>
              <Comments entryID={id} />
            </Column>
          </Columns>
        </Card.Content>
      </Card>
    </>
  );
};
