import * as React from "react";
import { useState } from "react";
import { useQuery } from "react-apollo";
import { Link } from "react-router-dom";

import { Breadcrumb, Card, Column, Columns, Image } from "tights";

import { useKey } from "@application/hooks";

import { Title } from "@application/components/helpers";

import { Carousel } from "./details/carousel";

import { IFeedEntry } from "@application/types";

import { FEED_DETAILS_URL, FEED_LIST_URL } from "@application/config/routes";

import * as QUERY from "./details/query.gql";

import { Actions } from "./entry/actions";

interface IQueryData {
  feed: {
    entry: IFeedEntry;
  };
}

const DEFAULT_INDEX = 0;
const NEXT_KEY = "ArrowRight";
const PREV_KEY = "ArrowLeft";

export const Details: React.FC<{
  id: string;
}> = ({ id }) => {
  const [index, setIndex] = useState<number>(DEFAULT_INDEX);
  const { data } = useQuery<IQueryData>(QUERY, { variables: { id } });
  const entry = data && data.feed && data.feed.entry;

  const photos = entry && entry.photos;
  const user = entry && entry.user;
  const avatar = user && user.avatar;

  const onGo = (offset: number) => {
    if (!photos) {
      return;
    }
    setIndex((index + photos.length + offset) % photos.length);
  };

  const onNext = () => onGo(+1);
  const onPrev = () => onGo(-1);

  useKey(onNext, NEXT_KEY);
  useKey(onPrev, PREV_KEY);

  return (
    <>
      <Title>Feed - Details | Playground</Title>
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
      <Card>
        <Card.Content>
          <Columns>
            <Column>{photos && <Carousel photos={photos} />}</Column>
            <Column>
              <Columns desktop tablet mobile vcentered gap={2}>
                <Column narrow>
                  <Image
                    rounded
                    square
                    dimensions={64}
                    src={avatar ? avatar.url : require("@application/assets/avatar/placeholder.svg")}
                  />
                </Column>
                <Column>
                  <span>by</span> <strong>{(user && user.name) || "-"}</strong>
                </Column>
                <Column narrow>
                  <Actions outlined entry={entry} />
                </Column>
              </Columns>
            </Column>
          </Columns>
        </Card.Content>
      </Card>
    </>
  );
};
