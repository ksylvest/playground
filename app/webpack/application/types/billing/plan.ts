import { Currency } from "./currency";
import { Interval } from "./interval";

import { IProduct } from "./product";

export interface IPlan {
  id: string;
  product: IProduct;
  amount: number; // cents
  currency: Currency;
  interval: Interval;
}
