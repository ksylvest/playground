export const ROOT_URL = "/";
export const NOTIFICATIONS_URL = "/notifications";

export const PROFILE_URL = ({ id }: { id: string }): string => `/profile/${id}`;
export const FEED_DETAILS_URL = ({ id }: { id: string }): string => `/feed/entries/${id}`;

export const ATTACHMENT_URL = (
  id: string,
  w: number,
  h: number,
  resize: "fit" | "fill",
  format: "avif" | "jpeg" | "webp" = "jpeg",
): string => `/attachments/${id}.${format}?resize=${resize}&w=${w}&h=${h}`;
