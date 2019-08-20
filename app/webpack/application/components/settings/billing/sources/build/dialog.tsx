import * as React from "react";
import { useState } from "react";
import { useMutation } from "react-apollo";
import {
  CardElement,
  Elements,
  injectStripe,
  ReactStripeElements,
} from "react-stripe-elements";

import {
  Button,
  Content,
  Delete,
  Form,
  Modal,
} from "@application/components/bulma";

import * as MUTATION from "./mutation.gql";

interface IMutationData {
  id: string;
}

interface IMutationVariables {
  source: string;
}

interface IDialogProps {
  onCancel(): void;
  onSave(): void;
}

const Dialog: React.FC<ReactStripeElements.InjectedStripeProps & IDialogProps> = ({
  stripe,
  onCancel,
  onSave,
}) => {
  const [submit, { loading }] = useMutation<IMutationData, IMutationVariables>(MUTATION);
  const [tokenizer, setTokenizer] = useState<Promise<ReactStripeElements.PatchedTokenResponse> | undefined>();
  const saving = loading || !!tokenizer;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (saving) { return; }
    if (!stripe) { return; }
    const promise = stripe.createToken();
    setTokenizer(promise);
    const { token } = await promise;
    setTokenizer(undefined);

    await submit({
      variables: {
        source: token!.id,
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
              <Modal.Card.Title>Add a Card</Modal.Card.Title>
              <Delete onClick={onCancel} />
            </Modal.Card.Head>
            <Modal.Card.Body>
              <Content>
                <CardElement onReady={(element) => element.focus()} />
              </Content>
            </Modal.Card.Body>
            <Modal.Card.Foot>
              <Button type="submit" loading={saving} disabled={saving} color="info">Save</Button>
              <Button type="button" disabled={saving} onClick={onCancel}>Cancel</Button>
            </Modal.Card.Foot>
          </Modal.Card>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

const DialogWithStripe = injectStripe(Dialog);
const DialogWithElements: React.FC<IDialogProps> = (props) => <Elements children={<DialogWithStripe {...props} />} />;
export { DialogWithElements as Dialog };
