import * as React from "react";

import { Hero } from "@application/components/bulma";

export const Empty: React.FC = () => (
  <Hero color="light">
    <Hero.Body>
      <h1 className="title">Nothing to See</h1>
      <h2 className="subtitle">Your Are All Caught up for Notifications</h2>
    </Hero.Body>
  </Hero>
);
