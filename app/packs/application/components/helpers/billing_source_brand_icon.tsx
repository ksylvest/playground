import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCcAmex } from "@fortawesome/free-brands-svg-icons/faCcAmex";
import { faCcDinersClub } from "@fortawesome/free-brands-svg-icons/faCcDinersClub";
import { faCcDiscover } from "@fortawesome/free-brands-svg-icons/faCcDiscover";
import { faCcJcb } from "@fortawesome/free-brands-svg-icons/faCcJcb";
import { faCcMastercard } from "@fortawesome/free-brands-svg-icons/faCcMastercard";
import { faCcVisa } from "@fortawesome/free-brands-svg-icons/faCcVisa";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons/faCreditCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Billing__Source, Billing__Source__Brand } from "@root/app_schema";

const BILLING_SOURCE_BRAND_ICONS: Partial<Record<Billing__Source__Brand, IconDefinition>> = {
  [Billing__Source__Brand.AmericanExpress]: faCcAmex,
  [Billing__Source__Brand.DinersClub]: faCcDinersClub,
  [Billing__Source__Brand.Discover]: faCcDiscover,
  [Billing__Source__Brand.Jcb]: faCcJcb,
  [Billing__Source__Brand.Mastercard]: faCcMastercard,
  [Billing__Source__Brand.Visa]: faCcVisa,
};

export const BillingSourceBrandIcon: React.FC<{
  source: Pick<Billing__Source, "brand">;
}> = ({ source }) => <FontAwesomeIcon icon={BILLING_SOURCE_BRAND_ICONS[source.brand] ?? faCreditCard} />;
