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

export const Dialog: React.FC<{
  loading: boolean;
  onContinue(): void;
  onCancel(): void;
}> = ({ loading, onContinue, onCancel }) => (
  <Modal>
    <ModalBackground onClick={onCancel} />
    <ModalContent>
      <ModalCard>
        <ModalCardHead>
          <ModalCardTitle>Avatar</ModalCardTitle>
          <Delete onClick={onCancel} />
        </ModalCardHead>
        <ModalCardBody>
          <Content>
            <p>Are you sure you want to clear your avatar?</p>
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
