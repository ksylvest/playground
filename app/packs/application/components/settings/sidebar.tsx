import * as React from "react";
import { NavLink } from "react-router-dom";

import { Menu } from "tights";

const LINKS = [
  { text: "Authentications", to: "authentications" },
  { text: "Avatar", to: "avatar" },
  { text: "Billing", to: "billing" },
  { text: "Password", to: "password" },
  { text: "Profile", to: "profile" },
];

export const Sidebar: React.FC = () => (
  <Menu>
    <Menu.Label>Personal</Menu.Label>
    <Menu.List>
      {LINKS.map(({ text, to }, key) => (
        <Menu.Item key={key}>
          <NavLink to={to} className={({ isActive }) => (isActive ? "is-active" : "")}>
            {text}
          </NavLink>
        </Menu.Item>
      ))}
    </Menu.List>
  </Menu>
);
