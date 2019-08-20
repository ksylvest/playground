import * as React from "react";
import { NavLink } from "react-router-dom";

import {
  SETTINGS_AVATAR_URL,
  SETTINGS_BILLING_URL,
  SETTINGS_PASSWORD_URL,
  SETTINGS_PROFILE_URL,
  SETTINGS_SESSIONS_URL,
} from "@application/config/routes";

import { Panel } from "@application/components/bulma";

export const Menu: React.FC = () => (
  <Panel>
    <Panel.Heading>Personal</Panel.Heading>
    <NavLink to={SETTINGS_AVATAR_URL} className="panel-block" activeClassName="is-active">
      Avatar
    </NavLink>
    <NavLink to={SETTINGS_BILLING_URL} className="panel-block" activeClassName="is-active">
      Billing
    </NavLink>
    <NavLink to={SETTINGS_PASSWORD_URL} className="panel-block" activeClassName="is-active">
      Password
    </NavLink>
    <NavLink to={SETTINGS_PROFILE_URL} className="panel-block" activeClassName="is-active">
      Profile
    </NavLink>
    <NavLink to={SETTINGS_SESSIONS_URL} className="panel-block" activeClassName="is-active">
      Sessions
    </NavLink>
  </Panel>
);
