import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";

import { IAppState } from "../store/states";

import { Types } from "../store/actions";

import { Authenticator } from "./authenticator";
import { Home } from "./home";

import { Auth } from "../resources";

interface IAuthProps {
  authed: boolean;
  onDeauthenticate(): void;
}

const AppNavLink = (props: { to: string, text: string }) =>
  <NavLink exact={true} to={props.to} className="navbar-item" activeClassName="is-active">{props.text}</NavLink>;

class App extends React.Component<IAuthProps> {
  public render() {
    const { onLogout } = this;
    const { authed } = this.props;

    return (
      <Router>
        <div>
          <header className="navbar is-light">
            <div className="navbar-brand">
              <NavLink className="navbar-item" to="/" activeClassName="is-active">Playground</NavLink>
              <div className="navbar-burger burger">
                <span />
                <span />
                <span />
              </div>
              <div className="navbar-menu">
                <AppNavLink to="/" text="Home" />
                {!authed && <AppNavLink to="/login" text="Login" />}
                {!authed && <AppNavLink to="/signup" text="Signup" />}
                {authed && <a className="navbar-item" onClick={onLogout}>Logout</a>}
              </div>
            </div>
          </header>

          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/login" component={Authenticator} />
            <Route exact={true} path="/signup" component={Authenticator} />
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
    );
  }

  private reset = async () => {
    await Auth.destroy();
    this.props.onDeauthenticate();
  }

  private onLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();

    this.reset();
  }
}

const ConnectedApp = connect(
  (state: IAppState) => {
    return {
      authed: !!state.session,
    };
  },
  (dispatch) => {
    return {
      onDeauthenticate: () => {
        dispatch({ type: Types.AUTH_RESET });
      },
    };
  },
)(App);

export { ConnectedApp as App };
