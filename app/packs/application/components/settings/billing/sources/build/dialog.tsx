import { useState } from "react";

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

import { useMutation } from "@apollo/client/react";

import { SettingsBillingSourceBuildDocument } from "@root/app_schema";

import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { TokenResult, loadStripe } from "@stripe/stripe-js";

declare const STRIPE_PUBLISHABLE_KEY: string;
declare const STRIPE_FAKE_TOKEN_RESULT: TokenResult | undefined;

const Fields: React.FC<{
  onCancel(): void;
  onSave(): void;
}> = ({ onCancel, onSave }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [submit, { loading }] = useMutation(SettingsBillingSourceBuildDocument);
  const [tokenizing, setTokenizing] = useState<boolean>(false);

  const tokenize = () => {
    if (typeof STRIPE_FAKE_TOKEN_RESULT !== "undefined") return Promise.resolve(STRIPE_FAKE_TOKEN_RESULT);
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;
    return stripe.createToken(card);
  };

  const ready = !!stripe && !!elements;
  const saving = loading || !!tokenizing;

  return (
    <Modal>
      <ModalBackground onClick={onCancel} />
      <ModalContent>
        <form
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
          <ModalCard>
            <ModalCardHead>
              <ModalCardTitle>Add a Card</ModalCardTitle>
              <Delete onClick={onCancel} />
            </ModalCardHead>
            <ModalCardBody>
              <Content>
                <CardElement />
              </Content>
            </ModalCardBody>
            <ModalCardFoot>
              <Button type="submit" disabled={!ready || saving} loading={saving} color="info">
                Save
              </Button>
              <Button type="button" disabled={!ready || saving} onClick={onCancel}>
                Cancel
              </Button>
            </ModalCardFoot>
          </ModalCard>
        </form>
      </ModalContent>
    </Modal>
  );
};

export const Dialog: React.FC<{
  onCancel(): void;
  onSave(): void;
}> = (props) => {
  const [stripe] = useState(() => loadStripe(STRIPE_PUBLISHABLE_KEY));

  return (
    <Elements stripe={stripe}>
      <Fields {...props} />
    </Elements>
  );
};
