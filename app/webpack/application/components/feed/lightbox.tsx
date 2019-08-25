import * as React from "react";
import { useState } from "react";

import { useKey } from "@application/hooks";

import { IFeedEntry } from "@application/types";

const CLOSE_KEY = "Escape";
const NEXT_KEY = "ArrowRight";
const PREV_KEY = "ArrowLeft";

import {
  Image,
  Modal,
} from "@application/components/bulma";

export const Lightbox: React.FC<{
  entry: IFeedEntry;
  onClose(): void;
}> = ({
  entry,
  onClose,
}) => {
  const [index, setIndex] = useState<number>(0);
  const photo = entry.photos[index];

  const onGo = (offset: number) => {
    if (!entry.photos) { return; }
    setIndex((index + entry.photos.length + offset) % entry.photos.length);
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
