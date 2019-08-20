import { Currency } from "./currency";
import { ISource } from "./source";

export interface ICustomer {
  id: string;
  currency: Currency;
  sources: ISource[];
}
