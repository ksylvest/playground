import * as React from "react";

import { Billing__Interval } from "@root/app_schema";

export const BillingIntervalHumanizer: React.FC<{
  interval: Billing__Interval;
}> = ({ interval }) => {
  switch (interval) {
    case Billing__Interval.Month:
      return <>month</>;
    case Billing__Interval.Year:
      return <>year</>;
  }
};
