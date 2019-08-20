import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import {
  BillingBrand,
  IBillingSource,
} from "@application/types";

export const BillingSourceIcon: React.FC<{
  source: IBillingSource;
}> = ({
  source,
}) => {
  const icon = ((): IconProp => {
    switch (source.brand) {
      case BillingBrand.AmericanExpress: return ["fab", "cc-amex"];
      case BillingBrand.DinersClub: return ["fab", "cc-diners-club"];
      case BillingBrand.Discover: return ["fab", "cc-discover"];
      case BillingBrand.JapanCreditBureau: return ["fab", "cc-jcb"];
      case BillingBrand.Mastercard: return ["fab", "cc-mastercard"];
      case BillingBrand.Visa: return ["fab", "cc-visa"];
      default: return "credit-card";
    }
  })();
  return <FontAwesomeIcon icon={icon} />;
};
