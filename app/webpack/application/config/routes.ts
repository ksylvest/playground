export const ROOT_URL = "/";
export const NOTIFICATIONS_URL = "/notifications";
export const SIGNUP_URL = "/signup";
export const LOGIN_URL = "/login";

export const SETTINGS_URL = "/settings";
export const SETTINGS_AVATAR_URL = "/settings/avatar";
export const SETTINGS_BILLING_URL = "/settings/billing";
export const SETTINGS_PASSWORD_URL = "/settings/password";
export const SETTINGS_PROFILE_URL = "/settings/profile";
export const SETTINGS_SESSIONS_URL = "/settings/sessions";

export const FEED_URL = "/(feed)";
export const FEED_LIST_URL = "/";
export const FEED_DETAILS_URL = ({ id }: { id: string }) => `/feed/entries/${id}`;

export const ATTACHMENT_URL = (
  id: string,
  w: number,
  h: number,
  resize: "fit" | "fill",
  format: "jpg" | "webp" | "heic" = "jpg",
) => {
  if (!id) {
    return;
  }
  return `/attachments/${id}.${format}?resize=${resize}&w=${w}&h=${h}`;
};
