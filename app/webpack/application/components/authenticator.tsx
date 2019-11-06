import * as React from "react";
import { useContext } from "react";
import { useLocation } from "react-router";
import { Link, Redirect, Route, Switch } from "react-router-dom";

import { World } from "@application/contexts";

import { Tabs } from "tights";

import { Login } from "./login";
import { Signup } from "./signup";

import { LOGIN_URL, ROOT_URL, SIGNUP_URL } from "@application/config/routes";

export const Authenticator: React.FC = () => {
  const { session } = useContext(World);
  const location = useLocation();
  const { state } = location;
  if (session) {
    return <Redirect to={state?.back || ROOT_URL} />;
  }
  return (
    <>
      <Tabs>
        <Tabs.List>
          <Tabs.Item active={location.pathname === LOGIN_URL}>
            <Link to={{ pathname: LOGIN_URL, state: location.state }}>Login</Link>
          </Tabs.Item>
          <Tabs.Item active={location.pathname === SIGNUP_URL}>
            <Link to={{ pathname: SIGNUP_URL, state: location.state }}>Signup</Link>
          </Tabs.Item>
        </Tabs.List>
      </Tabs>
      <Switch>
        <Route path={LOGIN_URL} component={Login} />
        <Route path={SIGNUP_URL} component={Signup} />
      </Switch>
    </>
  );
};
