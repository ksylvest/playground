import * as React from "react";

import { IBillingSource } from "@application/types";

export const BillingSourceNumber: React.FC<{
  source: IBillingSource;
}> = ({
  source,
}) => (
  <>•••• {source.number}</>
);
