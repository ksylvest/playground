import * as React from "react";

import {
  IBillingPlan,
  IBillingProduct,
} from "@application/types";

import { Card } from "tights";

import { BillingPlanTerms } from "@application/components/helpers";

const FEATURES = {
  Premium: "A great option for anyone looking for something delux.",
  Starter: "A great option for anyone looking for something basic.",
};

export const Entry: React.FC<{
  plans: IBillingPlan[];
  product: IBillingProduct;
  onSelect(selection: {
    plan: IBillingPlan,
    product: IBillingProduct;
  }): void;
}> = ({
  plans,
  product,
  onSelect,
}) => {
  const slug = product.name as ("Premium" | "Starter");
  const features = FEATURES[slug];

  return (
    <Card>
      <Card.Header>
        <Card.Header.Title>{product.name}</Card.Header.Title>
      </Card.Header>
      <Card.Content>{features}</Card.Content>
      <Card.Footer>
        {!plans.length &&
          <Card.Footer.Item tag="p">Unavailable</Card.Footer.Item>
        }
        {plans.map((plan) => {
          const onClick = (event: React.MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            onSelect({
              plan,
              product,
            });
          };
          return (
            <React.Fragment key={plan.id}>
              <Card.Footer.Item tag="a" onClick={onClick}>
                <BillingPlanTerms plan={plan} />
              </Card.Footer.Item>
            </React.Fragment>
          );
        })}
      </Card.Footer>
    </Card>
  );
};
