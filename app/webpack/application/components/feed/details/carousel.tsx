import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { times } from "lodash";
import * as React from "react";
import { useState } from "react";

import { Pagination } from "tights";

import { Attachment } from "@application/components/helpers";

import { Attached } from "@root/app_schema";

import { useKey } from "@application/hooks";

const DEFAULT_INDEX = 0;
const NEXT_KEY = "ArrowRight";
const PREV_KEY = "ArrowLeft";

const CHAR_CODE_OFFSET = 65; // i.e. 'A', 'B', 'C', ...

export const Carousel: React.FC<{
  photos: Attached[];
}> = ({ photos }) => {
  const [index, setIndex] = useState<number>(DEFAULT_INDEX);
  const photo = photos[index];
  const total = photos.length;

  const go = (offset: number) => {
    setIndex((index + total + offset) % total);
  };

  const next = () => go(+1);
  const prev = () => go(-1);

  useKey(next, NEXT_KEY);
  useKey(prev, PREV_KEY);

  return (
    <>
      <Attachment attachment={photo} square w={1280} h={1280} />
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
