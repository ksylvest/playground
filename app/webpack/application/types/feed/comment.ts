import { IUser } from "../user";

export interface IComment {
  id: string;
  message: string;
  sent: string;
  user: IUser;
}
