import * as React from "react";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { Button, Navbar } from "tights";

import { World } from "@application/contexts";

import { Logout } from "@application/components/logout";

import { LOGIN_URL, NOTIFICATIONS_URL, ROOT_URL, SETTINGS_URL, SIGNUP_URL } from "@application/config/routes";

const DEFAULT_ACTIVE = false;

const NavbarLink: React.FC<{ exact?: boolean; to: string }> = ({ exact, to, children }) => (
  <NavLink exact={exact} className="navbar-item" to={to} activeClassName="is-active">
    {children}
  </NavLink>
);

const HomeNavbarLink: React.FC = () => (
  <NavbarLink exact to={ROOT_URL}>
    Playground
  </NavbarLink>
);

const LoginNavbarLink: React.FC = () => (
  <NavbarLink exact to={LOGIN_URL}>
    Login
  </NavbarLink>
);

const SignupNavbarLink: React.FC = () => (
  <NavbarLink exact to={SIGNUP_URL}>
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
    <NavbarLink exact to={NOTIFICATIONS_URL}>
      Notifications {!!count && `(${count})`}
    </NavbarLink>
  );
};

const SettingsNavbarLink: React.FC = () => <NavbarLink to={SETTINGS_URL}>Settings</NavbarLink>;

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
      <Logout>
        {({ logout }) => (
          <Navbar.Item>
            <Button type="button" onClick={logout}>
              Logout
            </Button>
          </Navbar.Item>
        )}
      </Logout>
    </Navbar.Dropdown>
  </Navbar.Item>
);

export const Header: React.FC = () => {
  const { session } = useContext(World);
  const [active, setActive] = useState<boolean>(DEFAULT_ACTIVE);
  const onToggle = () => setActive(!active);

  return (
    <header>
      <Navbar color="light">
        <Navbar.Brand>
          <HomeNavbarLink />
          <Navbar.Burger active={active} onClick={onToggle} />
        </Navbar.Brand>
        <Navbar.Menu active={active}>
          <Navbar.Start>{session && <MainNavbarLinks />}</Navbar.Start>
          <Navbar.End>{session ? <MeNavbarItem /> : <AuthenticateNavbarLinks />}</Navbar.End>
        </Navbar.Menu>
      </Navbar>
    </header>
  );
};
