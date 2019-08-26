import * as React from "react";
import { useState } from "react";
import { useQuery } from "react-apollo";

import { useKey } from "@application/hooks";

import { IFeedEntry } from "@application/types";

import {
  Image,
  Modal,
} from "@application/components/bulma";

import * as QUERY from "./lightbox/query.gql";

interface IQueryData {
  feed: {
    entry: IFeedEntry;
  };
}

const DEFAULT_INDEX = 0;
const CLOSE_KEY = "Escape";
const NEXT_KEY = "ArrowRight";
const PREV_KEY = "ArrowLeft";

export const Lightbox: React.FC<{
  entry: IFeedEntry;
  onClose(): void;
}> = ({
  entry: { id },
  onClose,
}) => {
  const { data } = useQuery<IQueryData>(QUERY, { variables: { id } });
  const [index, setIndex] = useState<number>(DEFAULT_INDEX);
  const photos = data && data.feed && data.feed.entry.photos;
  const photo = photos && photos[index];

  const onGo = (offset: number) => {
    if (!photos) { return; }
    setIndex((index + photos.length + offset) % photos.length);
  };

  const onNext = () => onGo(+1);
  const onPrev = () => onGo(-1);

  useKey(onNext, NEXT_KEY);
  useKey(onPrev, PREV_KEY);
  useKey(onClose, CLOSE_KEY);

  return (
    <Modal>
      <Modal.Background onClick={onClose} />
      <Modal.Content>
        {photo && <Image src={photo.url} />}
      </Modal.Content>
      <Modal.Close onClick={onClose} />
    </Modal>
  );
};
