export interface IBase {
  element(type: "card"): Promise<stripe.IElement>;
  tokenize(element: stripe.IElement): Promise<stripe.ITokenResponse>;
}
