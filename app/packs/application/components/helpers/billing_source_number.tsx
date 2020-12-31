import * as React from "react";

import { Billing__Source } from "@root/app_schema";

export const BillingSourceNumber: React.FC<{
  source: Billing__Source;
}> = ({ source }) => <>•••• {source.number}</>;
