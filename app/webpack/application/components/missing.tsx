import * as Sentry from "@sentry/browser";
import * as React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { RouteComponentProps, withRouter } from "react-router";

import { Hero } from "@application/components/bulma";

const Missing: React.FC<RouteComponentProps> = ({
  location,
}) => {
  useEffect(() => {
    Sentry.captureException(new Error(`missing "${location.pathname}"`));
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Missing | Playground</title>
      </Helmet>

      <Hero color="light">
        <Hero.Body>
          <h1 className="title">Missing</h1>
          <h2 className="subtitle">The page "{location.pathname}" you requested could not be found.</h2>
        </Hero.Body>
      </Hero>
    </>
  );
};

const MissingWithRouter = withRouter(Missing);
export { MissingWithRouter as Missing };
