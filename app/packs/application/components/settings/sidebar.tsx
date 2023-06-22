import React from "react";
import { NavLink } from "react-router-dom";

import { Menu, MenuItem, MenuLabel, MenuList } from "tights";

const LINKS = [
  { text: "Authentications", to: "authentications" },
  { text: "Avatar", to: "avatar" },
  { text: "Billing", to: "billing" },
  { text: "Password", to: "password" },
  { text: "Profile", to: "profile" },
];

export const Sidebar: React.FC = () => (
  <Menu>
    <MenuLabel>Personal</MenuLabel>
    <MenuList>
      {LINKS.map(({ text, to }, key) => (
        <MenuItem key={key}>
          <NavLink to={to} className={({ isActive }) => (isActive ? "is-active" : "")}>
            {text}
          </NavLink>
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);
