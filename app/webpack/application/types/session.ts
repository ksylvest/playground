import { IGeography } from "./geography";

export enum SessionStatus {
  Online = "ONLINE",
  Offline = "Offline",
}

export interface ISession {
  id: string;
  ip: string;
  status: SessionStatus;
  seen: string;
  geography: IGeography | null;
}
