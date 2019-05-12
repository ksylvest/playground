import * as React from "react";
import { useContext } from "react";
import {
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { Context } from "./context";
import { Login } from "./login";
import { Signup } from "./signup";

import {
  LOGIN_URL,
  ROOT_URL,
  SIGNUP_URL,
} from "@application/config/routes";

export const Authenticator: React.FC = () => {
  const { user } = useContext(Context);
  if (user) { return <Redirect to={ROOT_URL} />; }
  return (
    <div className="container">
      <div className="section">
        <div className="tabs">
          <ul>
            <Route
              path={LOGIN_URL}
              children={({ match }) => (
                <li className={match ? "is-active" : undefined}>
                  <Link to={LOGIN_URL}>Login</Link>
                </li>
              )}
            />
            <Route
              path={SIGNUP_URL}
              children={({ match }) => (
                <li className={match ? "is-active" : undefined}>
                  <Link to={SIGNUP_URL}>Signup</Link>
                </li>
              )}
            />
          </ul>
        </div>
        <Switch>
          <Route
            path={LOGIN_URL}
            component={Login}
          />
          <Route
            path={SIGNUP_URL}
            component={Signup}
          />
        </Switch>
      </div>
    </div>
  );
};
