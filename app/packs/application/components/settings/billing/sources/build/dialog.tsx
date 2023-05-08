import * as React from "react";
import { useState } from "react";

import { useSettingsBillingPaymentMethodBuildMutation } from "@root/app_schema";

import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, TokenResult } from "@stripe/stripe-js";

import { Button, Content, Delete, Form, Modal } from "tights";

declare const STRIPE_PUBLISHABLE_KEY: string;
declare const STRIPE_FAKE_TOKEN_RESULT: TokenResult | undefined;

const Fields: React.FC<{
  onCancel(): void;
  onSave(): void;
}> = ({ onCancel, onSave }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [submit, { loading }] = useSettingsBillingPaymentMethodBuildMutation();
  const [tokenizing, setTokenizing] = useState<boolean>(false);

  const tokenize = async () => {
    if (typeof STRIPE_FAKE_TOKEN_RESULT !== "undefined") return Promise.resolve(STRIPE_FAKE_TOKEN_RESULT);
    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();
    console.log({ submitError });

    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      elements,
    });
    console.log({ paymentMethod });
  };

  const ready = !!stripe && !!elements;
  const saving = loading || !!tokenizing;

  return (
    <Modal>
      <Modal.Background onClick={onCancel} />
      <Modal.Content>
        <Form
          onSubmit={async (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (saving || !stripe || !elements) return;

            setTokenizing(true);
            const tokenization = await tokenize();
            setTokenizing(false);

            if (!tokenization) return;
            const { error, token } = tokenization;
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
                <PaymentElement />
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
      </Modal.Content>
    </Modal>
  );
};

export const Dialog: React.FC<{
  onCancel(): void;
  onSave(): void;
}> = (props) => {
  const [stripe] = useState(() => loadStripe(STRIPE_PUBLISHABLE_KEY));

  return (
    <Elements stripe={stripe} options={{ mode: "setup", currency: "usd", paymentMethodCreation: "manual" }}>
      <Fields {...props} />
    </Elements>
  );
};
