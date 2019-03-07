import * as React from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route, Switch } from "react-router-dom";

import { Login } from "./login";
import { Signup } from "./signup";

import { IAppState } from "../store/states";

interface IAuthenticatorProps {
  authed: boolean;
}

class Authenticator extends React.Component <IAuthenticatorProps> {
  public render() {
    const { authed } = this.props;
    if (authed) { return <Redirect to="/" />; }

    return (
      <div className="container">
        <div className="section">
          <div className="tabs">
            <ul>
              <Route path="/login" children={this.login} />
              <Route path="/signup" children={this.signup} />
            </ul>
          </div>
          <Switch>
            <Route
              path="/login"
              component={Login}
            />
            <Route
              path="/signup"
              component={Signup}
            />
          </Switch>
        </div>
      </div>
    );
  }

  private login = ({ match }: { match: boolean }): JSX.Element => {
    return (
      <li className={match ? "is-active" : undefined}>
        <Link to="/login">Login</Link>
      </li>
    );
  }

  private signup = ({ match }: { match: boolean }): JSX.Element => {
    return (
      <li className={match ? "is-active" : undefined}>
        <Link to="/signup">Signup</Link>
      </li>
    );
  }
}

const ConnectedAuthenticator = connect(
  (state: IAppState) => {
    return {
      authed: !!state.session,
    };
  },
  () => {
    return {};
  },
)(Authenticator);

export { ConnectedAuthenticator as Authenticator };
