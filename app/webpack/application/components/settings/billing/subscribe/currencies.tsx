import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as cn from "classnames";
import * as React from "react";

import { Billing__Currency } from "@root/app_schema";

import { Icon, Tabs } from "tights";

const OPTIONS: Array<{
  currency: Billing__Currency;
  icon: IconProp;
}> = [
  { currency: Billing__Currency.Cad, icon: "dollar-sign" },
  { currency: Billing__Currency.Eur, icon: "euro-sign" },
  { currency: Billing__Currency.Usd, icon: "dollar-sign" },
];

export const Currencies: React.FC<{
  currency?: Billing__Currency;
  onCurrency(currency: Billing__Currency): void;
}> = ({ currency, onCurrency }) => (
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
