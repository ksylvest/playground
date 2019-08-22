import { IBase } from "./base";

declare const STRIPE_PUBLISHABLE_KEY: string;

export class Live implements IBase {
  private stripe: stripe.IStripe = Stripe(STRIPE_PUBLISHABLE_KEY);
  private element = this.stripe.elements().create("card");

  public tokenize = () => this.stripe.createToken(this.element);
  public mount = (ref: HTMLElement) => this.element.mount(ref);
  public unmount = () => this.element.unmount();
}
