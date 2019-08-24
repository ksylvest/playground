import * as React from "react";

import { IBillingPlan } from "@application/types";

import { BillingIntervalHumanizer } from "./billing_interval_humanizer";
import { CurrencyNumberFormat } from "./currency_number_format";

export const BillingPlanTerms: React.FC<{
  plan: IBillingPlan;
}> = ({
  plan,
}) => (
  <>
    <CurrencyNumberFormat amount={plan.amount} currency={plan.currency} />
    {" / "}
    <BillingIntervalHumanizer interval={plan.interval} />
  </>
);
