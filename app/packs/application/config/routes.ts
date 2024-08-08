import { type Attached } from "@root/app_schema";

declare const IMGIX_HOST: string | null;

type Format = "avif" | "jpeg" | "webp";
type Attachment = Pick<Attached, "id" | "key">;

export const ROOT_URL = "/";
export const NOTIFICATIONS_URL = "/notifications";

export const PROFILE_URL = ({ id }: { id: string }): string => `/profile/${id}`;
export const FEED_DETAILS_URL = ({ id }: { id: string }): string => `/feed/entries/${id}`;

const IMGIX_URL = (attachment: Attachment, w: number, h: number, format: Format): string =>
  `${IMGIX_HOST}/${attachment.key}?fit=fill&w=${w}&h=${h}&fm=${format}`;

const DEFAULT_URL = (attachment: Attachment, w: number, h: number, format: Format): string =>
  `/attachments/${attachment.id}.${format}?resize=fill&w=${w}&h=${h}`;

export const ATTACHMENT_URL = (attachment: Attachment, w: number, h: number, format: Format): string =>
  IMGIX_HOST ? IMGIX_URL(attachment, w, h, format) : DEFAULT_URL(attachment, w, h, format);
