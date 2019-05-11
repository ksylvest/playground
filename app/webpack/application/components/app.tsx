import * as React from "react";
import { useState } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";

import { CLIENT as APOLLO_CLIENT } from "../config/apollo";

import { IUser } from "../types";

import { Context } from "./context";

import { Authenticator } from "./authenticator";
import { Home } from "./home";
import { Logout } from "./logout";
import { Settings } from "./settings";

import {
  LOGIN_URL,
  ROOT_URL,
  SETTINGS_URL,
  SIGNUP_URL,
} from "../config/routes";

declare const CONFIG: { user?: IUser };
const USER = CONFIG.user;

export const App: React.FC = () => {
  const [user, setUser] = useState<IUser | undefined>(USER);
  const auth = setUser;
  const deauth = () => setUser(undefined);

  return (
    <ApolloProvider client={APOLLO_CLIENT}>
      <Context.Provider value={{ auth, deauth, user }}>
        <Router>
          <div>
            <header className="navbar is-light">
              <div className="navbar-brand">
                <NavLink className="navbar-item" to={ROOT_URL} activeClassName="is-active">
                  Playground
                </NavLink>
                <div className="navbar-burger burger">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="navbar-menu">
                <div className="navbar-start">
                  <NavLink exact to={ROOT_URL} className="navbar-item" activeClassName="is-active">
                    Home
                  </NavLink>
                  {user &&
                    <NavLink to={SETTINGS_URL} className="navbar-item" activeClassName="is-active">
                      Settings
                    </NavLink>
                  }
                </div>
                <div className="navbar-end">
                  {!user &&
                    <>
                      <NavLink exact to={LOGIN_URL} className="navbar-item" activeClassName="is-active">
                        Login
                      </NavLink>
                      <NavLink exact to={SIGNUP_URL} className="navbar-item" activeClassName="is-active">
                        Signup
                      </NavLink>
                    </>
                  }
                  {user &&
                    <>
                      <Logout>
                        {({ logout }) => (
                          <div className="navbar-item">
                            <button type="button" className="button" onClick={logout}>
                              Logout
                            </button>
                          </div>
                        )}
                      </Logout>
                    </>
                  }
                </div>
              </div>
            </header>

            <Switch>
              <Route exact path={ROOT_URL} component={Home} />
              <Route exact path={LOGIN_URL} component={Authenticator} />
              <Route exact path={SIGNUP_URL} component={Authenticator} />
              <Route path={SETTINGS_URL} component={Settings} />
            </Switch>

            <footer>
              <div className="container">
                <div className="content has-text-centered">
                  <span>by</span> {" "} <a href="https://kvn.app" target="_blank">Kevin Sylvestre</a>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </Context.Provider>
    </ApolloProvider>
  );
};
