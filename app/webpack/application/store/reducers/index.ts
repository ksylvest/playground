import * as Cookies from "js-cookie";
import * as jwt from "jwt-decode";
import { Reducer } from "redux";

import {
  IAppState,
  ISessionState,
} from "../states";

import {
  Actions,
  Types,
} from "../actions";

const session = (): ISessionState | undefined => {
  const cookie = Cookies.get("jwt");
  if (!cookie) { return; }
  return jwt(cookie) as ISessionState;
};

const DEFAULT_STATE = { session: session() };

const reducer: Reducer<IAppState> = (state: IAppState = DEFAULT_STATE, action: Actions): IAppState => {
  switch (action.type) {
    case Types.AUTH_RESET: return { ...state, session: session() };
    default: return state;
  }
};

export { reducer };
