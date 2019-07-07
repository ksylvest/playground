import * as React from "react";
import { useState } from "react";
import { ApolloProvider } from "react-apollo";
import {
  BrowserRouter,
  Route,
  StaticRouter,
  Switch,
} from "react-router-dom";

import {
  Container,
  Section,
} from "@application/components/bulma";

import { CLIENT as APOLLO_CLIENT } from "@application/config/apollo";

import {
  IFlash,
  ISession,
} from "@application/types";

import { Footer } from "./app/footer";
import { Header } from "./app/header";

import { Context } from "./context";

import { Alerts } from "./alerts";
import { Authenticator } from "./authenticator";
import { Authorize } from "./authorize";
import { Home } from "./home";
import { Notifications } from "./notifications";
import { Settings } from "./settings";

import {
  LOGIN_URL,
  NOTIFICATIONS_URL,
  ROOT_URL,
  SETTINGS_URL,
  SIGNUP_URL,
} from "@application/config/routes";

const Router: React.FC<{
  location: string;
}> = ({
  location,
  children,
}) => {
  return typeof(window) !== "undefined"
    ? <BrowserRouter children={children} />
    : <StaticRouter children={children} location={location} />;
};

export const App: React.FC<{
  location: string;
  flash?: IFlash;
  session?: ISession;
}> = (props) => {
  const [flash, notify] = useState<IFlash | undefined>(props.flash);
  const [session, auth] = useState<ISession | undefined>(props.session);
  const deauth = () => auth(undefined);

  return (
    <ApolloProvider client={APOLLO_CLIENT}>
      <Context.Provider value={{ auth, deauth, session, flash, notify }}>
        <Router location={props.location}>
          <>
            <Header />
            <Container>
              <Section>
                <Alerts />
                <Switch>
                  <Route exact path={ROOT_URL} component={Home} />
                  <Route exact path={LOGIN_URL} component={Authenticator} />
                  <Route exact path={SIGNUP_URL} component={Authenticator} />
                  <Authorize>
                    <Route exact path={NOTIFICATIONS_URL} component={Notifications} />
                    <Route path={SETTINGS_URL} component={Settings} />
                  </Authorize>
                </Switch>
              </Section>
            </Container>
            <Footer />
          </>
        </Router>
      </Context.Provider>
    </ApolloProvider>
  );
};
