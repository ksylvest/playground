import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Container, Section } from "tights";

import { Flash } from "@application/types/flash";
import { Stats } from "@application/types/stats";

import { useActionCableSubscription } from "@application/hooks/use_action_cable_subscription";
import { useLocalStorage } from "@application/hooks/use_local_storage";

import { Alerts } from "./alerts";
import { Footer } from "./app/footer";
import { Header } from "./app/header";
import { Auth } from "./auth";
import { Authorize } from "./authorize";
import { Config } from "./config";
import { Details } from "./feed/details";
import { List } from "./feed/list";
import { Login } from "./login";
import { Notifications } from "./notifications";
import { Profile } from "./profile";
import { Settings } from "./settings";
import { Signup } from "./signup";
import { Styles } from "./styles";

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
  const [flash, notify] = useState<Flash | undefined>();
  const [stats, setStats] = useState<Stats | undefined>();

  const [token, setToken] = useLocalStorage("token");

  useActionCableSubscription(STATS_CHANNEL, setStats);
  useActionCableSubscription(PRESENCE_CHANNEL);

  const auth = (token: string): void => {
    setToken(token);
  };

  const deauth = (): void => {
    setToken(undefined);
  };

  return (
    <BrowserRouter>
      <Config flash={flash} notify={notify} token={token} auth={auth} deauth={deauth} stats={stats}>
        <Layout />
      </Config>
    </BrowserRouter>
  );
};
