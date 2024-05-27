import React from "react";
import { useState } from "react";

import times from "lodash/times";

import { Pagination, PaginationItem, PaginationLink, PaginationList, PaginationNext, PaginationPrev } from "tights";

import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AttachedFragment, UserFragment } from "@root/app_schema";

import { useKey } from "@application/hooks/use_key";

import { Attachment } from "@application/components/helpers/attachment";

const DEFAULT_INDEX = 0;
const NEXT_KEY = "ArrowRight";
const PREV_KEY = "ArrowLeft";

const CHAR_CODE_OFFSET = 65; // i.e. 'A', 'B', 'C', ...

export const Carousel: React.FC<{
  user: UserFragment;
  photos: readonly AttachedFragment[];
}> = ({ user, photos }) => {
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

  const label = String.fromCharCode(index + CHAR_CODE_OFFSET);

  return (
    <>
      <Attachment attachment={photo} square w={640} h={640} alt={`Photo '${label}' of ${total} by ${user.name}`} />
      <br />
      <Pagination rounded>
        <PaginationPrev
          onClick={(event): void => {
            event.preventDefault();
            event.stopPropagation();
            prev();
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </PaginationPrev>
        <PaginationNext
          onClick={(event): void => {
            event.preventDefault();
            event.stopPropagation();
            next();
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </PaginationNext>

        <PaginationList>
          {times(total, (page) => (
            <PaginationItem key={page}>
              <PaginationLink
                current={page === index}
                href="#"
                onClick={(event): void => {
                  event.preventDefault();
                  event.stopPropagation();
                  setIndex(page);
                }}
              >
                {String.fromCharCode(page + CHAR_CODE_OFFSET)}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationList>
      </Pagination>
    </>
  );
};
