import * as React from "react";
import { useState } from "react";

import { useSettingsBillingSourceBuildMutation } from "@root/app_schema";

import { CardElement } from "@stripe/react-stripe-js";

import { Button, Content, Delete, Form, Modal } from "tights";
import { Container } from "./container";
import { Tokenizer } from "./tokenizer";
import { TokenResult } from "@stripe/stripe-js";

export const Dialog: React.FC<{
  onCancel(): void;
  onSave(): void;
}> = ({ onCancel, onSave }) => {
  const [submit, { loading }] = useSettingsBillingSourceBuildMutation();
  const [tokenizer, setTokenizer] = useState<Promise<TokenResult> | undefined>();

  const saving = loading || !!tokenizer;

  return (
    <Container>
      <Modal>
        <Modal.Background onClick={onCancel} />
        <Modal.Content>
          <Tokenizer>
            {({ ready, tokenize }) => (
              <Form
                onSubmit={async (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  if (saving) return;

                  const attempt = tokenize();
                  setTokenizer(attempt);
                  const { error, token } = await attempt;
                  setTokenizer(undefined);

                  if (error || !token) return;

                  await submit({ variables: { source: token.id } });

                  onSave();
                }}
              >
                <Modal.Card>
                  <Modal.Card.Head>
                    <Modal.Card.Title>Add a Card</Modal.Card.Title>
                    <Delete onClick={onCancel} />
                  </Modal.Card.Head>
                  <Modal.Card.Body>
                    <Content>
                      <CardElement />
                    </Content>
                  </Modal.Card.Body>
                  <Modal.Card.Foot>
                    <Button type="submit" disabled={!ready || saving} loading={saving} color="info">
                      Save
                    </Button>
                    <Button type="button" disabled={!ready || saving} onClick={onCancel}>
                      Cancel
                    </Button>
                  </Modal.Card.Foot>
                </Modal.Card>
              </Form>
            )}
          </Tokenizer>
        </Modal.Content>
      </Modal>
    </Container>
  );
};
