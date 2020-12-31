import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { times } from "lodash";
import * as React from "react";
import { useState } from "react";

import { Pagination } from "tights";

import { Attachment } from "@application/components/helpers";

import { AttachedFragment } from "@root/app_schema";

import { useKey } from "@application/hooks";

const DEFAULT_INDEX = 0;
const NEXT_KEY = "ArrowRight";
const PREV_KEY = "ArrowLeft";

const CHAR_CODE_OFFSET = 65; // i.e. 'A', 'B', 'C', ...

export const Carousel: React.FC<{
  photos: AttachedFragment[];
}> = ({ photos }) => {
  const [index, setIndex] = useState<number>(DEFAULT_INDEX);
  const photo = photos[index];
  const total = photos.length;

  const go = (offset: number): void => {
    setIndex((index + total + offset) % total);
  };

  const next = (): void => go(+1);
  const prev = (): void => go(-1);

  useKey(next, NEXT_KEY);
  useKey(prev, PREV_KEY);

  return (
    <>
      <Attachment attachment={photo} square w={640} h={640} />
      <br />
      <Pagination rounded>
        <Pagination.Prev
          onClick={(event): void => {
            event.preventDefault();
            event.stopPropagation();
            prev();
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Pagination.Prev>
        <Pagination.Next
          onClick={(event): void => {
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
              onClick={(event): void => {
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
