import React from "react";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarBurger,
  NavbarDivider,
  NavbarDropdown,
  NavbarEnd,
  NavbarItem,
  NavbarMenu,
  NavbarStart,
} from "tights";

import { World } from "@application/contexts/world";

import { Logout } from "@application/components/logout";

const DEFAULT_ACTIVE = false;

const NavbarLink: React.FC<{
  end?: boolean;
  to: string;
  children?: React.ReactNode;
}> = ({ end, to, children }) => (
  <NavLink end={end} to={to} className={({ isActive }) => (isActive ? "navbar-item is-active" : "navbar-item")}>
    {children}
  </NavLink>
);

const HomeNavbarLink: React.FC = () => (
  <NavbarLink end to="/">
    Playground
  </NavbarLink>
);

const LoginNavbarLink: React.FC = () => (
  <NavbarLink end to="/login">
    Login
  </NavbarLink>
);

const SignupNavbarLink: React.FC = () => (
  <NavbarLink end to="/signup">
    Signup
  </NavbarLink>
);

const AuthenticateNavbarLinks: React.FC = () => (
  <>
    <LoginNavbarLink />
    <SignupNavbarLink />
  </>
);

const NotificationsNavbarLink: React.FC = () => {
  const { stats } = useContext(World);
  const count = stats?.notifications;
  return (
    <NavbarLink end to="/notifications">
      Notifications {!!count && `(${count})`}
    </NavbarLink>
  );
};

const SettingsNavbarLink: React.FC = () => <NavbarLink to="/settings">Settings</NavbarLink>;

const MainNavbarLinks: React.FC = () => (
  <>
    <SettingsNavbarLink />
    <NotificationsNavbarLink />
  </>
);

const MeNavbarItem: React.FC = () => (
  <NavbarItem dropdown hoverable>
    <NavbarLink to={""}>Me</NavbarLink>
    <NavbarDropdown direction="right">
      <MainNavbarLinks />
      <NavbarDivider />
      <Logout
        children={({ logout }): React.ReactElement => (
          <NavbarItem>
            <Button type="button" onClick={logout}>
              Logout
            </Button>
          </NavbarItem>
        )}
      />
    </NavbarDropdown>
  </NavbarItem>
);

export const Header: React.FC = () => {
  const { authentication } = useContext(World);
  const [active, setActive] = useState<boolean>(DEFAULT_ACTIVE);
  const onToggle = (): void => setActive(!active);

  return (
    <header>
      <Navbar color="light">
        <NavbarBrand>
          <HomeNavbarLink />
          <NavbarBurger active={active} onClick={onToggle} />
        </NavbarBrand>
        <NavbarMenu active={active}>
          <NavbarStart>{authentication && <MainNavbarLinks />}</NavbarStart>
          <NavbarEnd>{authentication ? <MeNavbarItem /> : <AuthenticateNavbarLinks />}</NavbarEnd>
        </NavbarMenu>
      </Navbar>
    </header>
  );
};
