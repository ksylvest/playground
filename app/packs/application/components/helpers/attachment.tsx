import React from "react";

import { Image } from "tights";

import { ATTACHMENT_URL } from "@application/config/routes";

type Resize = "fit" | "fill";
type Format = "jpeg" | "webp";

const SIZES = [2, 3];
const FORMATS: Format[] = ["webp", "jpeg"];

const SRC_SET_URLS = (id: string, w: number, h: number, resize: Resize, format: Format): string =>
  SIZES.map((s) => `${ATTACHMENT_URL(id, w * s, h * s, resize, format)} ${s}x`).join(", ");

export const Attachment: React.FC<
  React.ImgHTMLAttributes<HTMLImageElement> & {
    placeholder?: string;
    attachment: { id: string } | null | undefined;
    rounded?: boolean;
    square?: boolean;
    w: number;
    h: number;
    dimensions?: 16 | 24 | 32 | 48 | 64 | 96;
    resize?: Resize;
  }
> = ({ attachment, placeholder, rounded, square, w, h, dimensions, resize = "fill", ...props }) => {
  const id = attachment?.id;
  const src = id ? ATTACHMENT_URL(id, w, h, resize) : placeholder;

  return (
    <Image {...props} rounded={rounded} square={square} src={src} height={h} width={w} dimensions={dimensions}>
      {id &&
        FORMATS.map((format) => (
          <source key={format} srcSet={SRC_SET_URLS(id, w, h, resize, format)} type={`image/${format}`} />
        ))}
    </Image>
  );
};
