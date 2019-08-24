import * as React from "react";
import { useMutation } from "react-apollo";

import {
  IBillingPlan,
  IBillingProduct,
  Status,
} from "@application/types";

import {
  Button,
  Column,
  Columns,
  Content,
  Delete,
  Form,
  Level,
  Modal,
} from "tights";

import { BillingPlanTerms } from "@application/components/helpers";

import * as MUTATION from "./mutation.gql";

interface IMutationData {
  status: Status;
}

interface IMutationVariables {
  planID: string;
  productID: string;
}

export const Dialog: React.FC<{
  plan: IBillingPlan;
  product: IBillingProduct;
  onCancel(): void;
  onSave(): void;
}> = ({
  plan,
  product,
  onCancel,
  onSave,
}) => {
  const [submit, { loading }] = useMutation<IMutationData, IMutationVariables>(MUTATION);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (loading) { return; }
    await submit({
      variables: {
        planID: plan.id,
        productID: product.id,
      },
    });
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
              <Button type="submit" loading={loading} disabled={loading} color="info">Subscribe</Button>
              <Button type="button" disabled={loading} onClick={onCancel}>Cancel</Button>
            </Modal.Card.Foot>
          </Modal.Card>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
