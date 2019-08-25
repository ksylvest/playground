import { IEntry as IFeedEntry } from "./feed/entry";

export interface IFeed {
  entries: IFeedEntry[];
}

export { IFeedEntry };
