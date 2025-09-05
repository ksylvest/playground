import { Link, useParams } from "react-router-dom";

import { Card, CardContent, Column, Columns } from "tights";

import { useQuery } from "@apollo/client/react";

import { FeedEntryDocument } from "@root/app_schema";

import { FEED_DETAILS_URL, PROFILE_URL } from "@application/config/routes";

import { Attachment } from "@application/components/helpers/attachment";
import { Breadcrumbs } from "@application/components/helpers/breadcrumbs";
import { Title } from "@application/components/helpers/title";

import { Comments } from "./comments";
import { Carousel } from "./details/carousel";
import { Actions } from "./entry/actions";

const PLACEHOLDER = "/avatar/placeholder.svg";

export const Details: React.FC = () => {
  const { id } = useParams();
  if (!id) throw new Error('missing required "id"');

  const { data } = useQuery(FeedEntryDocument, { variables: { id } });
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
        <CardContent>
          <Columns>
            <Column>{photos && user && <Carousel user={user} photos={photos} />}</Column>
            <Column>
              <Columns desktop tablet mobile vcentered gap={2}>
                <Column narrow>
                  <Link to={profileURL}>
                    {user && (
                      <Attachment
                        attachment={avatar}
                        rounded
                        dimensions={64}
                        w={64}
                        h={64}
                        placeholder={PLACEHOLDER}
                        alt={user.name}
                      />
                    )}
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
        </CardContent>
      </Card>
    </>
  );
};
