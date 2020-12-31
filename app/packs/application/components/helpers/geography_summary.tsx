import * as React from "react";

import { GeographyFragment } from "@root/app_schema";

export const GeographySummary: React.FC<{
  geography: GeographyFragment;
}> = ({ geography }) => (
  <>
    {geography.city}, {geography.region}, {geography.country}
  </>
);
