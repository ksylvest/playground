import { IAttached } from "./attached";

export interface IUser {
  id: string;
  name: string;
  avatar?: IAttached;
}
