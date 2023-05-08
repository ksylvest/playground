import * as React from "react";

import { Billing__PaymentMethod } from "@root/app_schema";

const DATE_TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
};

export const BillingSourceExpiration: React.FC<{
  source: Billing__PaymentMethod;
}> = ({ source }) => {
  const [year, month] = source.exp.split("-").map(Number);
  const expiration = new Date(year, month);
  const now = new Date();
  return (
    <>
      {expiration > now ? "expires" : "expired"} {month}/{year}
    </>
  );
};
