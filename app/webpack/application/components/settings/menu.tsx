import * as React from "react";
import { NavLink } from "react-router-dom";

import {
  SETTINGS_PROFILE_URL,
  SETTINGS_SESSIONS_URL,
} from "@application/config/routes";

import { Panel } from "@application/components/bulma";

export const Menu: React.FC = () => (
  <Panel>
    <Panel.Heading>Personal</Panel.Heading>
    <NavLink to={SETTINGS_PROFILE_URL} className="panel-block" activeClassName="is-active">
      Profile
    </NavLink>
    <NavLink to={SETTINGS_SESSIONS_URL} className="panel-block" activeClassName="is-active">
      Sessions
    </NavLink>
  </Panel>
);
