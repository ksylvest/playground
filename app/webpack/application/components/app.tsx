import * as React from "react";
import { useState } from "react";
import { BrowserRouter, Route, StaticRouter, Switch } from "react-router-dom";

import { Config } from "./config";

import { useActionCableSubscription } from "@application/hooks";

import { Container, Section } from "tights";

import { Flash } from "@application/types";

import { Footer } from "./app/footer";
import { Header } from "./app/header";

import { Alerts } from "./alerts";
import { Auth } from "./auth";
import { Authenticator } from "./authenticator";
import { Authorize } from "./authorize";
import { Feed } from "./feed";
import { Notifications } from "./notifications";
import { Profile } from "./profile";
import { Settings } from "./settings";

import { LOGIN_URL, NOTIFICATIONS_URL, PROFILE_URL, SETTINGS_URL, SIGNUP_URL } from "@application/config/routes";

const STATS_CHANNEL = "StatsChannel";
const PRESENCE_CHANNEL = "PresenceChannel";

const Router: React.FC<{
  location?: string;
}> = ({ location, children }) => {
  return typeof window !== "undefined" ? (
    <BrowserRouter children={children} />
  ) : (
    <StaticRouter children={children} location={location} />
  );
};

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/feed" component={Feed} />
    <Route exact path={PROFILE_URL({ id: ":id" })} component={Profile} />
    <Route exact path={LOGIN_URL} component={Authenticator} />
    <Route exact path={SIGNUP_URL} component={Authenticator} />
    <Authorize>
      <Route exact path={NOTIFICATIONS_URL} component={Notifications} />
      <Route path={SETTINGS_URL} component={Settings} />
    </Authorize>
  </Switch>
);

const Layout: React.FC = () => (
  <>
    <Header />
    <Container>
      <Section>
        <Alerts />
        <Routes />
      </Section>
    </Container>
    <Footer />
    <Auth />
  </>
);

export const App: React.FC<{
  location?: string;
  session?: { id: string };
}> = (props) => {
  const [flash, notify] = useState<Flash | undefined>(undefined);
  const [session, auth] = useState<{ id: string } | undefined>(props.session);
  const [stats, setStats] = useState<undefined | { notifications: number }>(undefined);
  const deauth = (): void => auth(undefined);

  useActionCableSubscription(STATS_CHANNEL, setStats);
  useActionCableSubscription(PRESENCE_CHANNEL);

  return (
    <Router location={props.location}>
      <Config flash={flash} notify={notify} session={session} auth={auth} deauth={deauth} stats={stats}>
        <Layout />
      </Config>
    </Router>
  );
};
