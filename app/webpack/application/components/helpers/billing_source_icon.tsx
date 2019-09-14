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

import { Billing__Brand, Billing__Source } from "@root/app_schema";

export const BillingSourceIcon: React.FC<{
  source: Billing__Source;
}> = ({ source }) => {
  const icon = (() => {
    switch (source.brand) {
      case Billing__Brand.AmericanExpress:
        return faCcAmex;
      case Billing__Brand.DinersClub:
        return faCcDinersClub;
      case Billing__Brand.Discover:
        return faCcDiscover;
      case Billing__Brand.Jcb:
        return faCcJcb;
      case Billing__Brand.Mastercard:
        return faCcMastercard;
      case Billing__Brand.Visa:
        return faCcVisa;
      default:
        return faCreditCard;
    }
  })();
  return <FontAwesomeIcon icon={icon} />;
};
