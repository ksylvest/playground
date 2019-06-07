import * as React from "react";
import {
  useContext,
  useState,
} from "react";
import { NavLink } from "react-router-dom";

import { useActionCableSubscription } from "@application/utils/hooks";

import {
  Button,
  Navbar,
} from "@application/components/bulma";

import { Context } from "@application/components/context";
import { Logout } from "@application/components/logout";

import {
  LOGIN_URL,
  NOTIFICATIONS_URL,
  ROOT_URL,
  SETTINGS_URL,
  SIGNUP_URL,
} from "@application/config/routes";

export const Header: React.FC = () => {
  const { session } = useContext(Context);
  const [stats, setStats] = useState<undefined | { notifications: number }>(undefined);
  useActionCableSubscription({ channel: "StatsChannel" }, setStats);

  return (
    <header>
      <Navbar color="light">
        <Navbar.Brand>
          <NavLink className="navbar-item" to={ROOT_URL} activeClassName="is-active">
            Playground
          </NavLink>
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Start>
            <NavLink exact to={ROOT_URL} className="navbar-item" activeClassName="is-active">
              Home
            </NavLink>
            {session &&
              <>
                <NavLink to={SETTINGS_URL} className="navbar-item" activeClassName="is-active">
                  Settings
                </NavLink>
                <NavLink to={NOTIFICATIONS_URL} className="navbar-item" activeClassName="is-active">
                  Notifications {stats && !!stats.notifications && <>({stats.notifications})</>}
                </NavLink>
              </>
            }
          </Navbar.Start>
          <Navbar.End>
            {!session &&
              <>
                <NavLink exact to={LOGIN_URL} className="navbar-item" activeClassName="is-active">
                  Login
                </NavLink>
                <NavLink exact to={SIGNUP_URL} className="navbar-item" activeClassName="is-active">
                  Signup
                </NavLink>
              </>
            }
            {session &&
              <>
                <Logout>
                  {({ logout }) => (
                    <Navbar.Item>
                      <Button type="button" onClick={logout}>Logout</Button>
                    </Navbar.Item>
                  )}
                </Logout>
              </>
            }
          </Navbar.End>
        </Navbar.Menu>
      </Navbar>
    </header>
  );
};
