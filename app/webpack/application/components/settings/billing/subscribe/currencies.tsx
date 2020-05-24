import { faDollarSign, faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as cn from "classnames";
import * as React from "react";

import { Billing__Currency } from "@root/app_schema";

import { Icon, Tabs } from "tights";

const OPTIONS = [
  { currency: Billing__Currency.Cad, icon: faDollarSign },
  { currency: Billing__Currency.Eur, icon: faEuroSign },
  { currency: Billing__Currency.Usd, icon: faDollarSign },
];

export const Currencies: React.FC<{
  currency?: Billing__Currency;
  onCurrency(currency: Billing__Currency): void;
}> = ({ currency, onCurrency }) => (
  <Tabs fullwidth alignment="centered" style="toggle">
    <ul>
      {OPTIONS.map((option, index) => {
        const onClick = (event: React.MouseEvent): void => {
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
