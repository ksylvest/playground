import * as React from "react";

import { Billing__Plan } from "@root/app_schema";

import { BillingIntervalHumanizer } from "./billing_interval_humanizer";
import { CurrencyNumberFormat } from "./currency_number_format";

export const BillingPlanTerms: React.FC<{
  plan: Billing__Plan;
}> = ({ plan }) => (
  <>
    <CurrencyNumberFormat amount={plan.amount} currency={plan.currency} />
    {" / "}
    <BillingIntervalHumanizer interval={plan.interval} />
  </>
);
