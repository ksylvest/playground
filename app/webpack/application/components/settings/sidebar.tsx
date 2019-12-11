import * as React from "react";
import { NavLink } from "react-router-dom";

import {
  SETTINGS_AVATAR_URL,
  SETTINGS_BILLING_URL,
  SETTINGS_PASSWORD_URL,
  SETTINGS_PROFILE_URL,
  SETTINGS_SESSIONS_URL,
} from "@application/config/routes";

import { Menu } from "tights";

const LINKS = [
  { text: 'Avatar', to: SETTINGS_AVATAR_URL },
  { text: 'Billing', to: SETTINGS_BILLING_URL },
  { text: 'Password', to: SETTINGS_PASSWORD_URL },
  { text: 'Profile', to: SETTINGS_PROFILE_URL },
  { text: 'Sessions', to: SETTINGS_SESSIONS_URL },
];

export const Sidebar: React.FC = () => (
  <Menu>
    <Menu.Label>Personal</Menu.Label>
    <Menu.List>
      {LINKS.map(({ text, to }, key) => (
        <Menu.Item key={key}>
          <NavLink to={to} activeClassName="is-active">
            {text}
          </NavLink>
        </Menu.Item>
      ))}
    </Menu.List>
  </Menu>
);
