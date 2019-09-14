import * as React from "react";

import { Billing__Source } from "@root/app_schema";

import { BillingSourceSummary } from "@application/components/helpers";

import { Button, Content, Delete, Message, Modal } from "tights";

export const Dialog: React.FC<{
  source: Billing__Source;
  loading: boolean;
  onContinue(): void;
  onCancel(): void;
}> = ({ source, loading, onContinue, onCancel }) => (
  <Modal>
    <Modal.Background onClick={onCancel} />
    <Modal.Content>
      <Modal.Card>
        <Modal.Card.Head>
          <Modal.Card.Title>Remove This Card</Modal.Card.Title>
          <Delete onClick={onCancel} />
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Content>
            <p>Are you sure you want to remove this card?</p>
            <Message>
              <Message.Body>
                <BillingSourceSummary source={source} />
              </Message.Body>
            </Message>
          </Content>
        </Modal.Card.Body>
        <Modal.Card.Foot>
          <Button loading={loading} disabled={loading} color="danger" onClick={onContinue}>
            Confirm
          </Button>
          <Button disabled={loading} onClick={onCancel}>
            Cancel
          </Button>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal.Content>
  </Modal>
);
