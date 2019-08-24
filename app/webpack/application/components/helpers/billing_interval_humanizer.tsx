import * as React from "react";

import { BillingInterval } from "@application/types";

export const BillingIntervalHumanizer: React.FC<{
  interval: BillingInterval;
}> = ({
  interval,
}) => {
  switch (interval) {
    case BillingInterval.Month: return <>month</>;
    case BillingInterval.Year: return <>year</>;
  }
};
