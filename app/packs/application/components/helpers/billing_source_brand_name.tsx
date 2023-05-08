import * as React from "react";

import { Billing__PaymentMethod__Brand, Billing__PaymentMethod } from "@root/app_schema";

const BILLING_SOURCE_BRAND_NAMES: Record<Billing__PaymentMethod__Brand, string> = {
  [Billing__PaymentMethod__Brand.AmericanExpress]: "American Express",
  [Billing__PaymentMethod__Brand.DinersClub]: "Diners Club",
  [Billing__PaymentMethod__Brand.Discover]: "Discover",
  [Billing__PaymentMethod__Brand.Jcb]: "JCB",
  [Billing__PaymentMethod__Brand.Mastercard]: "Mastercard",
  [Billing__PaymentMethod__Brand.Unionpay]: "UnionPay",
  [Billing__PaymentMethod__Brand.Visa]: "Visa",
  [Billing__PaymentMethod__Brand.Unknown]: "Unknown",
};

export const BillingSourceBrandName: React.FC<{
  source: Pick<Billing__PaymentMethod, "brand">;
}> = ({ source }) => <>{BILLING_SOURCE_BRAND_NAMES[source.brand]}</>;
