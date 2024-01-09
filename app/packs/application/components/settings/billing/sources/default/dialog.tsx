import React from "react";

import { Billing__Source } from "@root/app_schema";

import { BillingSourceSummary } from "@application/components/helpers/billing_source_summary";

import {
  Button,
  Content,
  Delete,
  Message,
  MessageBody,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardBody,
  ModalCardFoot,
  ModalCardHead,
  ModalCardTitle,
  ModalContent,
} from "tights";

export const Dialog: React.FC<{
  source: Billing__Source;
  loading: boolean;
  onContinue(): void;
  onCancel(): void;
}> = ({ source, loading, onContinue, onCancel }) => (
  <Modal>
    <ModalBackground onClick={onCancel} />
    <ModalContent>
      <ModalCard>
        <ModalCardHead>
          <ModalCardTitle>Change Default Card</ModalCardTitle>
          <Delete onClick={onCancel} />
        </ModalCardHead>
        <ModalCardBody>
          <Content>
            <p>Are you sure you want to make this your default card?</p>
            <Message>
              <MessageBody>
                <BillingSourceSummary source={source} />
              </MessageBody>
            </Message>
          </Content>
        </ModalCardBody>
        <ModalCardFoot>
          <Button loading={loading} disabled={loading} color="primary" onClick={onContinue}>
            Confirm
          </Button>
          <Button disabled={loading} onClick={onCancel}>
            Cancel
          </Button>
        </ModalCardFoot>
      </ModalCard>
    </ModalContent>
  </Modal>
);
