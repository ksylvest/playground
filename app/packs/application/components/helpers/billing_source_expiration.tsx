import { DateTime } from "luxon";
import * as React from "react";

import { Billing__Source } from "@root/app_schema";

export const BillingSourceExpiration: React.FC<{
  source: Billing__Source;
}> = ({ source }) => {
  const expiration = DateTime.fromISO(source.exp);
  return (
    <>
      {expiration > DateTime.local() ? "expires" : "expired"} {expiration.year}-{expiration.month}
    </>
  );
};
