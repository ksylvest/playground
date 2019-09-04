import * as React from "react";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import {
  Column,
  Columns,
} from "tights";

import { Title } from "@application/components/helpers";

import { Menu } from "./settings/menu";

import { Avatar } from "./settings/avatar";
import { Billing } from "./settings/billing";
import { Password } from "./settings/password";
import { Profile } from "./settings/profile";
import { Sessions } from "./settings/sessions";

import {
  SETTINGS_AVATAR_URL,
  SETTINGS_BILLING_URL,
  SETTINGS_PASSWORD_URL,
  SETTINGS_PROFILE_URL,
  SETTINGS_SESSIONS_URL,
} from "@application/config/routes";

const SETTINGS_DEFAULT_URL = SETTINGS_PROFILE_URL;

export const Settings: React.FC = () => (
  <>
    <Title>Settings | Playground</Title>

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
            path={SETTINGS_BILLING_URL}
            component={Billing}
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
          <Redirect to={SETTINGS_DEFAULT_URL} />
        </Switch>
      </Column>
    </Columns>
  </>
);
