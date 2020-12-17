import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

declare const ENVIRONMENT: string;
declare const RELEASE: string;
declare const SENTRY_DSN: string | null;

((): void => {
  if (typeof window !== "undefined") {
    if (SENTRY_DSN && ENVIRONMENT !== "test" && ENVIRONMENT !== "development") {
      Sentry.init({
        dsn: SENTRY_DSN,
        environment: ENVIRONMENT,
        integrations: [new Integrations.BrowserTracing()],
        release: RELEASE,
      });
    }
  }
})();
