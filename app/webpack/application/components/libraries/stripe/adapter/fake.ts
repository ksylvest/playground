import { IBase } from "./base";

declare const STRIPE_FAKE_TOKEN_RESPONSE: stripe.ITokenResponse;

export class Fake implements IBase {
  public element = () => Promise.resolve({
    mount: () => { /* noop */ },
    unmount: () => { /* noop */ },
  })
  public tokenize = async () => {
    if (typeof(STRIPE_FAKE_TOKEN_RESPONSE) === "undefined") {
      throw new Error('"STRIPE_FAKE_TOKEN_RESPONSE" must be configured when testing.');
    }
    return Promise.resolve(STRIPE_FAKE_TOKEN_RESPONSE);
  }
}
