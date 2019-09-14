import * as React from "react";

import { Billing__Source } from "@root/app_schema";

import { BillingSourceBrand } from "./billing_source_brand";
import { BillingSourceExpiration } from "./billing_source_expiration";
import { BillingSourceNumber } from "./billing_source_number";

export const BillingSourceSummary: React.FC<{
  source: Billing__Source;
}> = ({ source }) => (
  <>
    <BillingSourceNumber source={source} /> <BillingSourceBrand source={source} />{" "}
    <BillingSourceExpiration source={source} />
  </>
);
