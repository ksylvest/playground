import { memoize } from "lodash";

import { IBase } from "./base";

declare const STRIPE_PUBLISHABLE_KEY: string;

const LIBRARY = new Promise<stripe.ILibrary>((
  resolve,
  reject,
) => {
  Object.assign(window, {
    STRIPE_ONERROR: () => {
      reject();
    },
    STRIPE_ONLOAD: () => {
      resolve(Stripe);
    },
  });
});

export class Live implements IBase {
  private stripe = memoize(async () => (await LIBRARY)(STRIPE_PUBLISHABLE_KEY));

  public element = async (type: "card") => {
    const stripe = await this.stripe();
    return stripe.elements().create(type);
  }

  public tokenize = async (element: stripe.IElement) => {
    const stripe = await this.stripe();
    return stripe.createToken(element);
  }
}
