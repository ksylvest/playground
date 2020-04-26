import { Base } from "./base";

declare const STRIPE_FAKE_TOKEN_RESPONSE: stripe.TokenResponse;

export class Fake implements Base {
  public element = (): Promise<stripe.Element> =>
    Promise.resolve({
      mount: () => {
        /* noop */
      },
      unmount: () => {
        /* noop */
      },
    });
  public tokenize = async (): Promise<stripe.TokenResponse> => {
    if (typeof STRIPE_FAKE_TOKEN_RESPONSE === "undefined") {
      throw new Error('"STRIPE_FAKE_TOKEN_RESPONSE" must be configured when testing.');
    }
    return Promise.resolve(STRIPE_FAKE_TOKEN_RESPONSE);
  };
}
