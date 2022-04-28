import * as React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Config } from "./config";

import { useActionCableSubscription } from "@application/hooks";

import { Container, Section } from "tights";

import { Flash } from "@application/types";

import { Styles } from "./styles";

import { Footer } from "./app/footer";
import { Header } from "./app/header";

import { Alerts } from "./alerts";
import { Auth } from "./auth";
import { Login } from "./login";
import { Signup } from "./signup";
import { Authorize } from "./authorize";
import { Notifications } from "./notifications";
import { Profile } from "./profile";
import { Settings } from "./settings";
import { Details } from "./feed/details";
import { List } from "./feed/list";

const STATS_CHANNEL = "StatsChannel";
const PRESENCE_CHANNEL = "PresenceChannel";

const Layout: React.FC = () => (
  <>
    <Styles />
    <Header />
    <Container>
      <Section>
        <Alerts />
        <Routes>
          <Route index element={<List />} />
          <Route path="feed/entries/:id" element={<Details />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="notifications"
            element={
              <Authorize>
                <Notifications />
              </Authorize>
            }
          />
          <Route
            path="settings/*"
            element={
              <Authorize>
                <Settings />
              </Authorize>
            }
          />
        </Routes>
      </Section>
    </Container>
    <Footer />
    <Auth />
  </>
);

export const App: React.FC = () => {
  const [flash, notify] = useState<Flash | undefined>(undefined);
  const [authentication, auth] = useState<{ id: string } | undefined>(() => {
    const authenticationID = document.head.querySelector('meta[name="authentication-id"]').getAttribute("content");
    return authenticationID ? { id: authenticationID } : undefined;
  });
  const [stats, setStats] = useState<undefined | { notifications: number }>(undefined);
  const deauth = (): void => auth(undefined);

  useActionCableSubscription(STATS_CHANNEL, setStats);
  useActionCableSubscription(PRESENCE_CHANNEL);

  return (
    <BrowserRouter>
      <Config flash={flash} notify={notify} authentication={authentication} auth={auth} deauth={deauth} stats={stats}>
        <Layout />
      </Config>
    </BrowserRouter>
  );
};
