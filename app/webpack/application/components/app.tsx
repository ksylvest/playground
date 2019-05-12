import * as React from "react";
import { useState } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";

import {
  Button,
  Container,
  Content,
  Navbar,
} from "@application/components/bulma";

import { CLIENT as APOLLO_CLIENT } from "@application/config/apollo";

import { IUser } from "@application/types";

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
} from "@application/config/routes";

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
                  {user &&
                    <NavLink to={SETTINGS_URL} className="navbar-item" activeClassName="is-active">
                      Settings
                    </NavLink>
                  }
                </Navbar.Start>
                <Navbar.End>
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

            <Switch>
              <Route exact path={ROOT_URL} component={Home} />
              <Route exact path={LOGIN_URL} component={Authenticator} />
              <Route exact path={SIGNUP_URL} component={Authenticator} />
              <Route path={SETTINGS_URL} component={Settings} />
            </Switch>

            <footer>
              <Container>
                <Content>
                  <p className="has-text-centered">
                    <span>by</span> {" "} <a href="https://kvn.app" target="_blank">Kevin Sylvestre</a>
                  </p>
                </Content>
              </Container>
            </footer>
          </div>
        </Router>
      </Context.Provider>
    </ApolloProvider>
  );
};
