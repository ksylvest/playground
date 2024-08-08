import React from "react";

import { Image } from "tights";

import { type Attached } from "@root/app_schema";

import { ATTACHMENT_URL } from "@application/config/routes";

type Attachment = Pick<Attached, "id" | "key">;

type Format = "avif" | "webp" | "jpeg";

const SIZES = [2, 3];
const FORMATS: Format[] = ["avif", "webp", "jpeg"];
const DEFAULT_FORMAT = "jpeg";

const SRC_SET_URLS = (attachment: Pick<Attached, "id" | "key">, w: number, h: number, format: Format): string =>
  SIZES.map((s) => `${ATTACHMENT_URL(attachment, w * s, h * s, format)} ${s}x`).join(", ");

export const Attachment: React.FC<
  React.ImgHTMLAttributes<HTMLImageElement> & {
    placeholder?: string;
    attachment: Attachment | null | undefined;
    rounded?: boolean;
    square?: boolean;
    w: number;
    h: number;
    dimensions?: 16 | 24 | 32 | 48 | 64 | 96;
  }
> = ({ attachment, placeholder, rounded, square, w, h, dimensions, ...props }) => {
  const src = attachment ? ATTACHMENT_URL(attachment, w, h, DEFAULT_FORMAT) : placeholder;

  return (
    <Image {...props} rounded={rounded} square={square} src={src} height={h} width={w} dimensions={dimensions}>
      {attachment &&
        FORMATS.map((format) => (
          <source key={format} srcSet={SRC_SET_URLS(attachment, w, h, format)} type={`image/${format}`} />
        ))}
    </Image>
  );
};
