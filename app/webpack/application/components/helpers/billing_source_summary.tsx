import * as React from "react";

import { IBillingSource } from "@application/types";

import { BillingSourceBrand } from "./billing_source_brand";
import { BillingSourceExpiration } from "./billing_source_expiration";
import { BillingSourceNumber } from "./billing_source_number";

export const BillingSourceSummary: React.FC<{
  source: IBillingSource;
}> = ({ source }) => (
  <>
    <BillingSourceNumber source={source} /> <BillingSourceBrand source={source} />{" "}
    <BillingSourceExpiration source={source} />
  </>
);
