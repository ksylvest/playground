import { IGeography } from "./geography";

export enum SessionStatus {
  Online = "ONLINE",
  Offline = "OFFLINE",
}

export interface ISession {
  id: string;
  ip: string;
  status: SessionStatus;
  deleted: boolean;
  seen: string;
  geography: IGeography | null;
}
