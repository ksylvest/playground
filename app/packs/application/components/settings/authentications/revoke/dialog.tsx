import * as React from "react";

import { AuthenticationFragment } from "@root/app_schema";

import { Button, Content, Delete, Modal } from "tights";

import { Geography } from "./geography";

export const Dialog: React.FC<{
  authentication: AuthenticationFragment;
  loading: boolean;
  onContinue(): void;
  onCancel(): void;
}> = ({ authentication, loading, onContinue, onCancel }) => (
  <Modal>
    <Modal.Background onClick={onCancel} />
    <Modal.Content>
      <Modal.Card>
        <Modal.Card.Head>
          <Modal.Card.Title>Revoke</Modal.Card.Title>
          <Delete onClick={onCancel} />
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Content>
            <p>Are you sure you want to revoke this authentication?</p>
            <p>Devices using this authentication will be need to re-authenticate.</p>
            <p>
              <strong>{authentication.ip}</strong>
            </p>
            {authentication.geography && <Geography geography={authentication.geography} />}
          </Content>
        </Modal.Card.Body>
        <Modal.Card.Foot>
          <Button loading={loading} disabled={loading} color="danger" onClick={onContinue}>
            Continue
          </Button>
          <Button disabled={loading} onClick={onCancel}>
            Cancel
          </Button>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal.Content>
  </Modal>
);
