export interface Base {
  element(type: "card"): Promise<stripe.Element>;
  tokenize(element: stripe.Element): Promise<stripe.TokenResponse>;
}
