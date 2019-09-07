import * as React from "react";
import { useState } from "react";
import { useMutation } from "react-apollo";

import {
  Element,
  useAdapter,
  useElement,
} from "@application/libraries/stripe";

import {
  Button,
  Content,
  Delete,
  Form,
  Modal,
} from "tights";

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

export const Dialog: React.FC<IDialogProps> = ({
  onCancel,
  onSave,
}) => {
  const [submit, { loading }] = useMutation<IMutationData, IMutationVariables>(MUTATION);
  const [tokenizer, setTokenizer] = useState<Promise<stripe.ITokenResponse> | undefined>(undefined);
  const adapter = useAdapter();
  const element = useElement(adapter, "card");

  const saving = loading || !!tokenizer;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (saving) { return; }
    const attempt = adapter.tokenize(await element);
    setTokenizer(attempt);
    const {
      error,
      token,
    } = await attempt;
    setTokenizer(undefined);
    if (error) { return; }

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
                <Element element={element} />
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
