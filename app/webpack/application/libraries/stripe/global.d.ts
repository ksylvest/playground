declare let Stripe: stripe.Library;

declare namespace stripe {
  interface Library {
    (token: string): Stripe;
    version: number;
  }

  interface Token {
    id: string;
  }

  interface Error {
    message?: string;
  }

  interface TokenResponse {
    token?: Token;
    error?: Error;
  }

  interface Element {
    mount(element: HTMLElement): void;
    unmount(): void;
  }

  interface Elements {
    create(type: "card"): Element;
  }

  interface Stripe {
    elements(): Elements;
    createToken(element: Element): Promise<TokenResponse>;
  }
}
