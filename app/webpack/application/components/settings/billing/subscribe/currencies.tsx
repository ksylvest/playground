import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as cn from "classnames";
import * as React from "react";

import { BillingCurrency } from "@application/types";

import {
  Icon,
  Tabs,
} from "tights";

const OPTIONS: Array<{
  currency: BillingCurrency,
  icon: IconProp,
}> = [
  { currency: BillingCurrency.CAD, icon: "dollar-sign" },
  { currency: BillingCurrency.EUR, icon: "euro-sign" },
  { currency: BillingCurrency.USD, icon: "dollar-sign" },
];

export const Currencies: React.FC<{
  currency?: BillingCurrency;
  onCurrency(currency: BillingCurrency): void;
}> = ({
  currency,
  onCurrency,
}) => (
  <Tabs fullwidth alignment="centered" style="toggle">
    <ul>
      {OPTIONS.map((option, index) => {
        const onClick = (event: React.MouseEvent) => {
          event.preventDefault();
          event.stopPropagation();
          onCurrency(option.currency);
        };

        return (
          <li key={index} className={cn(option.currency === currency && "is-active")}>
            <a href="#" onClick={onClick}>
              <Icon>
                <FontAwesomeIcon icon={option.icon} />
              </Icon>
              <span>{option.currency}</span>
            </a>
          </li>
        );
      })}
    </ul>
  </Tabs>
);
