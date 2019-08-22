import { IBase } from "./base";

const TOKENIZE: Promise<stripe.ITokenResponse> = Promise.resolve({ token: { id: "fake" } });

export class Fake implements IBase {
  public tokenize = () => TOKENIZE;
  public mount = () => { /* noop */ };
  public unmount = () => { /* noop */ };
}
