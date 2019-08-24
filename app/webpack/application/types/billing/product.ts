import { IPlan } from "./plan";

export interface IProduct {
  id: string;
  name: string;
  features: string[];
  plans: IPlan[];
}
