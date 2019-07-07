import * as React from "react";
import { Helmet } from "react-helmet";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import {
  Column,
  Columns,
} from "@application/components/bulma";

import { Menu } from "./settings/menu";

import { Avatar } from "./settings/avatar";
import { Password } from "./settings/password";
import { Profile } from "./settings/profile";
import { Sessions } from "./settings/sessions";

import {
  SETTINGS_AVATAR_URL,
  SETTINGS_PASSWORD_URL,
  SETTINGS_PROFILE_URL,
  SETTINGS_SESSIONS_URL,
} from "@application/config/routes";

const SESSIONS_DEFAULT_URL = SETTINGS_PROFILE_URL;

export const Settings: React.FC = () => (
  <>
    <Helmet>
      <title>Settings | Playground</title>
    </Helmet>

    <Columns>
      <Column size={3}>
        <Menu />
      </Column>
      <Column size={9}>
        <Switch>
          <Route
            path={SETTINGS_AVATAR_URL}
            component={Avatar}
          />
          <Route
            path={SETTINGS_PASSWORD_URL}
            component={Password}
          />
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
      </Column>
    </Columns>
  </>
);
