declare var Stripe: stripe.ILibrary;

declare namespace stripe {
  interface ILibrary {
    (token: string): IStripe;
    version: number;
  }

  interface IToken {
    id: string;
  }

  interface IError {
    message?: string;
  }

  interface ITokenResponse {
    token?: IToken;
    error?: IError;
}

  interface IElement {
    mount(element: HTMLElement): void;
    unmount(): void;
  }

  interface IElements {
    create(type: "card"): IElement;
  }

  interface IStripe {
    elements(): IElements;
    createToken(element: IElement): Promise<ITokenResponse>;
  }
}
