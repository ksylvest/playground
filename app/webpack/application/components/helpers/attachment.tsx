import * as React from "react";
import { Image } from "tights";

import { ATTACHMENT_URL } from "@application/config/routes";

const SIZES = [2, 3, 4];

export const Attachment: React.FC<{
  placeholder?: string;
  attachment: { id: string } | null | undefined;
  rounded?: boolean;
  square?: boolean;
  w: number;
  h: number;
  resize?: "fit" | "fill";
}> = ({ attachment, placeholder, rounded, square, w, h, resize = "fill" }) => {
  const id = (attachment && attachment.id) || undefined;

  return (
    <Image
      rounded={rounded}
      square={square}
      src={id ? ATTACHMENT_URL(id, w, h, resize) : placeholder}
      srcSet={id && SIZES.map((s) => `${ATTACHMENT_URL(id, w * s, h * s, resize)} ${s}x`).join(", ")}
      height={h}
      width={w}
    />
  );
};
