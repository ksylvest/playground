import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
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

import { Billing__PaymentMethod, Billing__PaymentMethod__Brand } from "@root/app_schema";

const BILLING_PAYMENT_METHOD_BRAND_ICONS: Partial<Record<Billing__PaymentMethod__Brand, IconDefinition>> = {
  [Billing__PaymentMethod__Brand.AmericanExpress]: faCcAmex,
  [Billing__PaymentMethod__Brand.DinersClub]: faCcDinersClub,
  [Billing__PaymentMethod__Brand.Discover]: faCcDiscover,
  [Billing__PaymentMethod__Brand.Jcb]: faCcJcb,
  [Billing__PaymentMethod__Brand.Mastercard]: faCcMastercard,
  [Billing__PaymentMethod__Brand.Visa]: faCcVisa,
};

export const BillingPaymentMethodBrandIcon: React.FC<{
  source: Pick<Billing__PaymentMethod, "brand">;
}> = ({ source }) => <FontAwesomeIcon icon={BILLING_PAYMENT_METHOD_BRAND_ICONS[source.brand] ?? faCreditCard} />;
