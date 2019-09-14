import * as React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Config } from "./config";

import { useActionCableSubscription } from "@application/hooks";

import { Container, Section } from "tights";

import { IFlash } from "@application/types";

import { Footer } from "./app/footer";
import { Header } from "./app/header";

import { Alerts } from "./alerts";
import { Auth } from "./auth";
import { Authenticator } from "./authenticator";
import { Authorize } from "./authorize";
import { Feed } from "./feed";
import { Notifications } from "./notifications";
import { Settings } from "./settings";

import { LOGIN_URL, NOTIFICATIONS_URL, SETTINGS_URL, SIGNUP_URL } from "@application/config/routes";

declare const CONFIG: { session?: { id: string } };
const SESSION = CONFIG.session;

const STATS_CHANNEL = { channel: "StatsChannel" };
const PRESENCE_CHANNEL = { channel: "PresenceChannel" };

export const App: React.FC = () => {
  const [flash, notify] = useState<IFlash | undefined>(undefined);
  const [session, auth] = useState<{ id: string } | undefined>(SESSION);
  const [stats, setStats] = useState<undefined | { notifications: number }>(undefined);
  const deauth = () => auth(undefined);

  useActionCableSubscription(STATS_CHANNEL, setStats);
  useActionCableSubscription(PRESENCE_CHANNEL, () => {
    /* noop */
  });

  return (
    <Router>
      <Config flash={flash} notify={notify} session={session} auth={auth} deauth={deauth} stats={stats}>
        <Header />
        <Container>
          <Section>
            <Alerts />
            <Switch>
              <Route exact path="/" component={Feed} />
              <Route path="/feed" component={Feed} />
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
        <Auth />
      </Config>
    </Router>
  );
};
