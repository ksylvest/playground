import * as React from "react";
import { useContext } from "react";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { Context } from "./context";

import { Menu } from "./settings/menu";
import { Profile } from "./settings/profile";
import { Sessions } from "./settings/sessions";

import {
  ROOT_URL,
  SETTINGS_PROFILE_URL,
  SETTINGS_SESSIONS_URL,
} from "../config/routes";

const SESSIONS_DEFAULT_URL = SETTINGS_PROFILE_URL;

export const Settings: React.FC = () => {
  const { user } = useContext(Context);
  if (!user) { return <Redirect to={ROOT_URL} />; }
  return (
    <div className="container">
      <div className="section">
        <div className="columns">
          <div className="column is-3">
            <Menu />
          </div>
          <div className="column is-9">
            <Switch>
              <Route
                path={SETTINGS_PROFILE_URL}
                component={Profile}
              />
              <Route
                path={SETTINGS_SESSIONS_URL}
                component={Sessions}
              />
              <Redirect to={SESSIONS_DEFAULT_URL} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
