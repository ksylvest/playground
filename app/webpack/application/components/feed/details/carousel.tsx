import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { times } from "lodash";
import * as React from "react";
import { useState } from "react";

import { Image, Pagination } from "tights";

import { useKey } from "@application/hooks";

import { IAttached } from "@application/types";

const DEFAULT_INDEX = 0;
const NEXT_KEY = "ArrowRight";
const PREV_KEY = "ArrowLeft";

const CHAR_CODE_OFFSET = 65; // i.e. 'A', 'B', 'C', ...

export const Carousel: React.FC<{
  photos: IAttached[];
}> = ({ photos }) => {
  const [index, setIndex] = useState<number>(DEFAULT_INDEX);
  const photo = photos[index];
  const total = photos.length;

  const go = (offset: number) => {
    if (!photos) {
      return;
    }
    setIndex((index + total + offset) % total);
  };

  const next = () => go(+1);
  const prev = () => go(-1);

  useKey(next, NEXT_KEY);
  useKey(prev, PREV_KEY);

  return (
    <>
      <Image square src={photo.url} />
      <br />
      <Pagination rounded>
        <Pagination.Prev
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            prev();
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Pagination.Prev>
        <Pagination.Next
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            next();
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Pagination.Next>

        <Pagination.List>
          {times(total, (page) => (
            <Pagination.Link
              key={page}
              current={page === index}
              href="#"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIndex(page);
              }}
            >
              {String.fromCharCode(page + CHAR_CODE_OFFSET)}
            </Pagination.Link>
          ))}
        </Pagination.List>
      </Pagination>
    </>
  );
};
