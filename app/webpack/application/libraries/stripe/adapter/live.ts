import * as loadjs from "loadjs";

import { IBase } from "./base";

declare const STRIPE_PUBLISHABLE_KEY: string;

const STRIPE_URL = "https://js.stripe.com/v3/";
const STRIPE_PROMISE = async () => {
  const client = new Promise<stripe.ILibrary>((resolve, reject) => {
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

export class Live implements IBase {
  private stripe: Promise<stripe.IStripe>;

  constructor() {
    this.stripe = STRIPE_PROMISE();
  }

  public element = async (type: "card") => {
    const stripe = await this.stripe;
    return stripe.elements().create(type);
  };

  public tokenize = async (element: stripe.IElement) => {
    const stripe = await this.stripe;
    return stripe.createToken(element);
  };
}
