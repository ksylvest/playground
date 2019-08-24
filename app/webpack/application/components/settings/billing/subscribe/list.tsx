import * as React from "react";

import {
  BillingCurrency,
  IBillingPlan,
  IBillingProduct,
} from "@application/types";

import {
  Column,
  Columns,
} from "tights";

import { Entry } from "./entry";

export const List: React.FC<{
  currency?: BillingCurrency;
  products: IBillingProduct[];
  onSelect(selection: {
    plan: IBillingPlan;
    product: IBillingProduct;
  }): void;
}> = ({
  currency,
  products,
  onSelect,
}) => (
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
