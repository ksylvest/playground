import * as Sentry from "@sentry/browser";

if (typeof window !== "undefined") {
  const SENTRY_DSN = document.head.querySelector('meta[name="sentry-dsn"]').getAttribute("content");
  const ENVIRONMENT = document.head.querySelector('meta[name="environment"]').getAttribute("content");
  const RELEASE = document.head.querySelector('meta[name="release"]').getAttribute("content");

  if (SENTRY_DSN && ENVIRONMENT !== "test" && ENVIRONMENT !== "development") {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: ENVIRONMENT,
      release: RELEASE,
    });
  }
}
