import { IAttached } from "../attached";
import { IUser } from "../user";

export interface IEntry {
  id: string;
  tags: string[];
  photos: IAttached[];
  user: IUser;
}
