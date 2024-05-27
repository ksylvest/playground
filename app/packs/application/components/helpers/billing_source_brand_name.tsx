import React from "react";

import { Billing__Source, Billing__Source__Brand } from "@root/app_schema";

const BILLING_SOURCE_BRAND_NAMES: Record<Billing__Source__Brand, string> = {
  [Billing__Source__Brand.AmericanExpress]: "American Express",
  [Billing__Source__Brand.DinersClub]: "Diners Club",
  [Billing__Source__Brand.Discover]: "Discover",
  [Billing__Source__Brand.Jcb]: "JCB",
  [Billing__Source__Brand.Mastercard]: "Mastercard",
  [Billing__Source__Brand.Unionpay]: "UnionPay",
  [Billing__Source__Brand.Visa]: "Visa",
  [Billing__Source__Brand.Unknown]: "Unknown",
};

export const BillingSourceBrandName: React.FC<{
  source: Pick<Billing__Source, "brand">;
}> = ({ source }) => <>{BILLING_SOURCE_BRAND_NAMES[source.brand]}</>;
