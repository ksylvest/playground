import { DateTime } from "luxon";
import * as React from "react";

import { IBillingSource } from "@application/types";

export const BillingSourceExpiration: React.FC<{
  source: IBillingSource;
}> = ({ source }) => {
  const expiration = DateTime.fromISO(source.exp);
  return (
    <>
      {expiration > DateTime.local() ? "expires" : "expired"} {expiration.year}-{expiration.month}
    </>
  );
};
