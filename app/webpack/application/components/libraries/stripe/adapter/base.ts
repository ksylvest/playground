export interface IBase {
  mount(element: HTMLElement): void;
  unmount(): void;
  tokenize(): Promise<stripe.ITokenResponse>;
}
