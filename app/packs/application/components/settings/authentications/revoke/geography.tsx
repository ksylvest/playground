import React from "react";

import { GeographyFragment } from "@root/app_schema";

import { GeographySummary } from "@application/components/helpers";

export const Geography: React.FC<{ geography: GeographyFragment }> = ({ geography }) => (
  <p>
    <strong>
      <GeographySummary geography={geography} />
    </strong>
  </p>
);
