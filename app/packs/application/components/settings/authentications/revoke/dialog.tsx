import React from "react";

import {
  Button,
  Content,
  Delete,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardBody,
  ModalCardFoot,
  ModalCardHead,
  ModalCardTitle,
  ModalContent,
} from "tights";

import { AuthenticationFragment } from "@root/app_schema";

import { Geography } from "./geography";

export const Dialog: React.FC<{
  authentication: AuthenticationFragment;
  loading: boolean;
  onContinue(): void;
  onCancel(): void;
}> = ({ authentication, loading, onContinue, onCancel }) => (
  <Modal>
    <ModalBackground onClick={onCancel} />
    <ModalContent>
      <ModalCard>
        <ModalCardHead>
          <ModalCardTitle>Revoke</ModalCardTitle>
          <Delete onClick={onCancel} />
        </ModalCardHead>
        <ModalCardBody>
          <Content>
            <p>Are you sure you want to revoke this authentication?</p>
            <p>Devices using this authentication will be need to re-authenticate.</p>
            <p>
              <strong>{authentication.ip}</strong>
            </p>
            {authentication.geography && <Geography geography={authentication.geography} />}
          </Content>
        </ModalCardBody>
        <ModalCardFoot>
          <Button loading={loading} disabled={loading} color="danger" onClick={onContinue}>
            Continue
          </Button>
          <Button disabled={loading} onClick={onCancel}>
            Cancel
          </Button>
        </ModalCardFoot>
      </ModalCard>
    </ModalContent>
  </Modal>
);
