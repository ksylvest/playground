import * as React from "react";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { Button, Navbar } from "tights";

import { World } from "@application/contexts";

import { Logout } from "@application/components/logout";

import { NOTIFICATIONS_URL } from "@application/config/routes";

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
  <Navbar.Item dropdown hoverable>
    <Navbar.Link>Me</Navbar.Link>
    <Navbar.Dropdown direction="right">
      <MainNavbarLinks />
      <Navbar.Divider />
      <Logout
        children={({ logout }): React.ReactElement => (
          <Navbar.Item>
            <Button type="button" onClick={logout}>
              Logout
            </Button>
          </Navbar.Item>
        )}
      />
    </Navbar.Dropdown>
  </Navbar.Item>
);

export const Header: React.FC = () => {
  const { authentication } = useContext(World);
  const [active, setActive] = useState<boolean>(DEFAULT_ACTIVE);
  const onToggle = (): void => setActive(!active);

  return (
    <header>
      <Navbar color="light">
        <Navbar.Brand>
          <HomeNavbarLink />
          <Navbar.Burger active={active} onClick={onToggle} />
        </Navbar.Brand>
        <Navbar.Menu active={active}>
          <Navbar.Start>{authentication && <MainNavbarLinks />}</Navbar.Start>
          <Navbar.End>{authentication ? <MeNavbarItem /> : <AuthenticateNavbarLinks />}</Navbar.End>
        </Navbar.Menu>
      </Navbar>
    </header>
  );
};
