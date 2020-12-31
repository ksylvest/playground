import * as loadjs from "loadjs";

import { Base } from "./base";

declare const STRIPE_PUBLISHABLE_KEY: string;

const STRIPE_URL = "https://js.stripe.com/v3/";
const STRIPE_PROMISE = async (): Promise<stripe.Stripe> => {
  const client = new Promise<stripe.Library>((resolve, reject) => {
    loadjs(STRIPE_URL, "stripe");
    loadjs.ready("stripe", {
      error: () => {
        reject();
      },
      success: () => {
        resolve(Stripe);
      },
    });
  });
  return (await client)(STRIPE_PUBLISHABLE_KEY);
};

export class Live implements Base {
  private stripe: Promise<stripe.Stripe>;

  constructor() {
    this.stripe = STRIPE_PROMISE();
  }

  public element = async (type: "card"): Promise<stripe.Element> => {
    const stripe = await this.stripe;
    return stripe.elements().create(type);
  };

  public tokenize = async (element: stripe.Element): Promise<stripe.TokenResponse> => {
    const stripe = await this.stripe;
    return stripe.createToken(element);
  };
}
