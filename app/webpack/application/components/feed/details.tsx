import * as React from "react";
import { Link } from "react-router-dom";

import { Card, Column, Columns } from "tights";

import { useFeedEntryQuery } from "@root/app_schema";

import { Attachment, Breadcrumbs, Title } from "@application/components/helpers";

import { Comments } from "./comments";
import { Carousel } from "./details/carousel";

import { FEED_DETAILS_URL, PROFILE_URL } from "@application/config/routes";

import { Actions } from "./entry/actions";

import PLACEHOLDER from "@application/assets/avatar/placeholder.svg";

export const Details: React.FC<{
  id: string;
}> = ({ id }) => {
  const { data } = useFeedEntryQuery({ variables: { id } });
  const entry = data?.feed?.entry;

  const photos = entry?.photos;
  const user = entry?.user;
  const avatar = user?.avatar;
  const profileURL = user ? PROFILE_URL(user) : "#";

  return (
    <>
      <Title>Feed - Details | Playground</Title>
      <Breadcrumbs links={[{ name: "Details", to: FEED_DETAILS_URL({ id }) }]} />
      <Card>
        <Card.Content>
          <Columns>
            <Column>{photos && <Carousel photos={photos} />}</Column>
            <Column>
              <Columns desktop tablet mobile vcentered gap={2}>
                <Column narrow>
                  <Link to={profileURL}>
                    {user && <Attachment attachment={avatar} rounded w={64} h={64} placeholder={PLACEHOLDER} />}
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
