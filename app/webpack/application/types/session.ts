import { IGeography } from "./geography";

export interface ISession {
  id: string;
  ip: string;
  geography: IGeography | null;
}
