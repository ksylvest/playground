import * as loadjs from "loadjs";
import { memoize } from "lodash";

import { IBase } from "./base";

declare const STRIPE_PUBLISHABLE_KEY: string;

const STRIPE_URL = "https://js.stripe.com/v3/";
loadjs(STRIPE_URL, "stripe");

const LIBRARY = new Promise<stripe.ILibrary>((resolve, reject) => {
  loadjs.ready("stripe", {
    error: () => {
      reject();
    },
    success: () => {
      resolve(Stripe);
    },
  });
});

export class Live implements IBase {
  private stripe = memoize(async () => (await LIBRARY)(STRIPE_PUBLISHABLE_KEY));

  public element = async (type: "card") => {
    const stripe = await this.stripe();
    return stripe.elements().create(type);
  };

  public tokenize = async (element: stripe.IElement) => {
    const stripe = await this.stripe();
    return stripe.createToken(element);
  };
}
