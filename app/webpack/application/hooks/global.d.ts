declare class HelloSign {
  public constructor();
  public open(url: string, options: any): void;
  public on(event: string, callback: (data: any) => void): void;
}

declare module "hellosign-embedded" {
  export default HelloSign;
}
