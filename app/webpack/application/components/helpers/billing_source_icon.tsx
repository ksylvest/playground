import {
  faCcAmex,
  faCcDinersClub,
  faCcDiscover,
  faCcJcb,
  faCcMastercard,
  faCcVisa,
} from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
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
  const icon = (() => {
    switch (source.brand) {
      case BillingBrand.AmericanExpress: return faCcAmex;
      case BillingBrand.DinersClub: return faCcDinersClub;
      case BillingBrand.Discover: return faCcDiscover;
      case BillingBrand.JapanCreditBureau: return faCcJcb;
      case BillingBrand.Mastercard: return faCcMastercard;
      case BillingBrand.Visa: return faCcVisa;
      default: return faCreditCard;
    }
  })();
  return <FontAwesomeIcon icon={icon} />;
};
