import * as React from "react";

import { Billing__Plan, Billing__Product } from "@root/app_schema";

import { Card } from "tights";

import { BillingPlanTerms } from "@application/components/helpers";

const FEATURES = {
  Premium: "A great option for anyone looking for something delux.",
  Starter: "A great option for anyone looking for something basic.",
};

export const Entry: React.FC<{
  plans: Billing__Plan[];
  product: Billing__Product;
  onSelect(selection: { plan: Billing__Plan; product: Billing__Product }): void;
}> = ({ plans, product, onSelect }) => {
  const slug = product.name as "Premium" | "Starter";
  const features = FEATURES[slug];

  return (
    <Card>
      <Card.Header>
        <Card.Header.Title>{product.name}</Card.Header.Title>
      </Card.Header>
      <Card.Content>{features}</Card.Content>
      <Card.Footer>
        {!plans.length && <Card.Footer.Item tag="p">Unavailable</Card.Footer.Item>}
        {plans.map((plan) => {
          const onClick = (event: React.MouseEvent): void => {
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
