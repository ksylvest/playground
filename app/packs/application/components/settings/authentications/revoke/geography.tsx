import { GeographyFragment } from "@root/app_schema";

import { GeographySummary } from "@application/components/helpers/geography_summary";

export const Geography: React.FC<{ geography: GeographyFragment }> = ({ geography }) => (
  <p>
    <strong>
      <GeographySummary geography={geography} />
    </strong>
  </p>
);
