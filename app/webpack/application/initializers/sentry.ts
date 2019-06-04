import * as Sentry from "@sentry/browser";

declare const ENVIRONMENT: "production" | "test" | "development";
declare const SENTRY_DSN: string | null;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENVIRONMENT,
  });
}
