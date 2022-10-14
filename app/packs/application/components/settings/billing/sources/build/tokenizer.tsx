import { useElements, useStripe } from "@stripe/react-stripe-js";
import { TokenResult } from "@stripe/stripe-js";
import React, { useState } from "react";

declare const STRIPE_PUBLISHABLE_KEY: string;

type Props = {
  ready: boolean;
  tokenize(): Promise<TokenResult>;
};

export const Tokenizer: React.FC<{
  children(props: Props): React.ReactElement;
}> = ({ children }) => {
  const stripe = useStripe();
  const elements = useElements();

  const tokenize = async (): Promise<TokenResult> => {
    if (!stripe || !elements) return;
    return stripe.createToken(elements.getElement("card"));
  };

  return children({
    tokenize,
    ready: !!stripe && !!elements,
  });
};
