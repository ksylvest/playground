import { IComment as IFeedComment } from "./feed/comment";
import { ICommentInput as IFeedCommentInput } from "./feed/comment_input";
import { IEntry as IFeedEntry } from "./feed/entry";

export interface IFeed {
  entries: IFeedEntry[];
}

export { IFeedComment };
export { IFeedCommentInput };
export { IFeedEntry };
