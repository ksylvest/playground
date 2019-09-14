import * as React from "react";

import { Billing__Brand, Billing__Source } from "@root/app_schema";

export const BillingSourceBrand: React.FC<{
  source: Billing__Source;
}> = ({ source }) => {
  const text = (() => {
    switch (source.brand) {
      case Billing__Brand.AmericanExpress:
        return "American Express";
      case Billing__Brand.DinersClub:
        return "Diners Club";
      case Billing__Brand.Discover:
        return "Discover";
      case Billing__Brand.Jcb:
        return "JCB";
      case Billing__Brand.Mastercard:
        return "Mastercard";
      case Billing__Brand.Visa:
        return "Visa";
      default:
        return "Unknown";
    }
  })();
  return <>{text}</>;
};
