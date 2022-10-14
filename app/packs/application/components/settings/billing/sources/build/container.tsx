import React, { useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

declare const STRIPE_PUBLISHABLE_KEY: string;

export const Container: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [stripe] = useState(() => loadStripe(STRIPE_PUBLISHABLE_KEY));

  return <Elements stripe={stripe} children={children} />;
};
