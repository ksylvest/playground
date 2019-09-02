import * as React from "react";

import {
  Button,
  Content,
  Delete,
  Modal,
} from "tights";

export const Dialog: React.FC<{
  loading: boolean;
  onContinue(): void;
  onCancel(): void;
}> = ({
  loading,
  onContinue,
  onCancel,
}) => (
  <Modal>
    <Modal.Background onClick={onCancel} />
    <Modal.Content>
      <Modal.Card>
        <Modal.Card.Head>
          <Modal.Card.Title>Avatar</Modal.Card.Title>
          <Delete onClick={onCancel} />
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Content>
            <p>Are you sure you want to clear your avatar?</p>
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
