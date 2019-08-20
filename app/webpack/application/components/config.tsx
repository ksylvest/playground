declare const STRIPE_PUBLISHABLE_KEY: string;

import * as React from "react";
import {
  useEffect,
  useState,
} from "react";

import { ApolloProvider } from "react-apollo";
import { StripeProvider } from "react-stripe-elements";

import { CLIENT as APOLLO_CLIENT } from "@application/config/apollo";

const STRIPE_JS = document.head.querySelector("#stripe-js")!;

export const Config: React.FC = ({
  children,
}) => {
  const [stripe, setStripe] = useState(() => typeof(Stripe) !== "undefined" ? Stripe(STRIPE_PUBLISHABLE_KEY) : null);
  useEffect(() => {
    const listener = () => {
      if (stripe) { return; }
      setStripe(Stripe(STRIPE_PUBLISHABLE_KEY));
    };
    STRIPE_JS.addEventListener("load", listener);
    return () => STRIPE_JS.removeEventListener("load", listener);
  }, []);

  return (
    <ApolloProvider client={APOLLO_CLIENT}>
      <StripeProvider stripe={stripe}>
        {children}
      </StripeProvider>
    </ApolloProvider>
  );
};
