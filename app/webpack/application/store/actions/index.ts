import { Action } from "redux";
import { Types } from "./types";

interface IAuthResetAction extends Action {
  type: Types.AUTH_RESET;
}

type Actions = IAuthResetAction;

export {
  Actions,
  IAuthResetAction,
  Types,
};
