import * as React from "react";

import { Billing__Plan, Billing__Product, useBuildBillingSubscribeMutation } from "@root/app_schema";

import { Button, Content, Delete, Form, Level, Modal } from "tights";

import { BillingPlanTerms } from "@application/components/helpers";

export const Dialog: React.FC<{
  plan: Billing__Plan;
  product: Billing__Product;
  onCancel(): void;
  onSave(): void;
}> = ({ plan, product, onCancel, onSave }) => {
  const [submit, { loading }] = useBuildBillingSubscribeMutation();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (loading) {
      return;
    }
    const variables = { planID: plan.id };
    await submit({ variables });
    onSave();
  };

  return (
    <Modal>
      <Modal.Background onClick={onCancel} />
      <Modal.Content>
        <Form onSubmit={onSubmit}>
          <Modal.Card>
            <Modal.Card.Head>
              <Modal.Card.Title>Subscribe</Modal.Card.Title>
              <Delete onClick={onCancel} />
            </Modal.Card.Head>
            <Modal.Card.Body>
              <Content>
                <Level>
                  <Level.Left>
                    <strong>{product.name}</strong>
                  </Level.Left>
                  <Level.Right>
                    <BillingPlanTerms plan={plan} />
                  </Level.Right>
                </Level>
              </Content>
            </Modal.Card.Body>
            <Modal.Card.Foot>
              <Button type="submit" loading={loading} disabled={loading} color="info">
                Subscribe
              </Button>
              <Button type="button" disabled={loading} onClick={onCancel}>
                Cancel
              </Button>
            </Modal.Card.Foot>
          </Modal.Card>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
