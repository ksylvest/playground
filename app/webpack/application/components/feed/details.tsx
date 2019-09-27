import * as React from "react";
import { Link } from "react-router-dom";

import { Breadcrumb, Card, Column, Columns } from "tights";

import { useFeedEntryQuery } from "@root/app_schema";

import { Attachment, Title } from "@application/components/helpers";

import { Comments } from "./comments";
import { Carousel } from "./details/carousel";

import { FEED_DETAILS_URL, FEED_LIST_URL, PROFILE_URL } from "@application/config/routes";

import { Actions } from "./entry/actions";

import PLACEHOLDER from "@application/assets/avatar/placeholder.svg";

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
  const profileURL = user ? PROFILE_URL(user) : "#";

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
                  <Link to={profileURL}>
                    <Attachment attachment={avatar} placeholder={PLACEHOLDER} rounded w={64} h={64} />
                  </Link>
                </Column>
                <Column>
                  <span>by</span> <Link to={profileURL}>{(user && user.name) || "-"}</Link>
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
