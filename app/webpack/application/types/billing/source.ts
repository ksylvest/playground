import { Brand } from "./brand";

export interface ISource {
  id: string;
  default: boolean;
  number: string;
  brand: Brand;
  exp: string;
}
