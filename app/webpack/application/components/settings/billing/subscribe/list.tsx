import * as React from "react";

import { Billing__Currency, Billing__Plan, Billing__Product } from "@root/app_schema";

import { Column, Columns } from "tights";

import { Entry } from "./entry";

export const List: React.FC<{
  currency?: Billing__Currency;
  products: Billing__Product[];
  onSelect(selection: { plan: Billing__Plan; product: Billing__Product }): void;
}> = ({ currency, products, onSelect }) => (
  <Columns>
    {products.map((product) => (
      <Column key={product.id}>
        <Entry
          product={product}
          plans={product.plans.filter((plan) => plan.currency === currency)}
          onSelect={onSelect}
        />
      </Column>
    ))}
  </Columns>
);
