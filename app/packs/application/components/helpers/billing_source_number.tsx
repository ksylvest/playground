import * as React from "react";

import { Billing__PaymentMethod } from "@root/app_schema";

export const BillingSourceNumber: React.FC<{
  source: Billing__PaymentMethod;
}> = ({ source }) => <>•••• {source.number}</>;
