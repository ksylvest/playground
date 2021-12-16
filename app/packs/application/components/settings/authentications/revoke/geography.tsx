import * as React from "react";

import { GeographyFragment } from "@root/app_schema";

import { GeographyMap } from "@application/components/helpers";
import { GeographySummary } from "@application/components/helpers";

export const Geography: React.FC<{ geography: GeographyFragment }> = ({ geography }) => (
  <>
    <p>
      <strong>
        <GeographySummary geography={geography} />
      </strong>
    </p>
    <GeographyMap geography={geography} />
  </>
);
