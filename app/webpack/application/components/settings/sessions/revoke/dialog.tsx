import * as React from "react";

import { ISession } from "@application/types";

import {
  Button,
  Content,
  Delete,
  Modal,
} from "tights";

import { Geography } from "./geography";

export const Dialog: React.FC<{
  session: ISession;
  loading: boolean;
  onContinue(): void;
  onCancel(): void;
}> = ({
  session,
  loading,
  onContinue,
  onCancel,
}) => (
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
            <p>Are you sure you want to revoke this session?</p>
            <p>Devices using this session will be need to re-authenticate.</p>
            <p><strong>{session.ip}</strong></p>
            {session.geography && <Geography geography={session.geography} />}
          </Content>
        </Modal.Card.Body>
        <Modal.Card.Foot>
          <Button loading={loading} disabled={loading} color="danger" onClick={onContinue}>Continue</Button>
          <Button disabled={loading} onClick={onCancel}>Cancel</Button>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal.Content>
  </Modal>
);
