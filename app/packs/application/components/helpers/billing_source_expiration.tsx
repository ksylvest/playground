import * as React from "react";

import { Billing__Source } from "@root/app_schema";

const DATE_TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
};

export const BillingSourceExpiration: React.FC<{
  source: Billing__Source;
}> = ({ source }) => {
  const expiration = new Date(source.exp);
  const now = new Date();
  return (
    <>
      {expiration > now ? "expires" : "expired"} {expiration.toLocaleString(undefined, DATE_TIME_FORMAT_OPTIONS)}
    </>
  );
};
