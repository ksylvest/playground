import { StrictMode, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ApolloProvider } from "@apollo/client/react";

import { Flash } from "@application/types/flash";
import { Stats } from "@application/types/stats";

import { CLIENT } from "@application/config/apollo";

import { World } from "@application/contexts/world";

import { useActionCableSubscription } from "@application/hooks/use_action_cable_subscription";
import { useLocalStorage } from "@application/hooks/use_local_storage";

import { ROUTES } from "./routes";

const STATS_CHANNEL = "StatsChannel";
const PRESENCE_CHANNEL = "PresenceChannel";

const ROUTER = createBrowserRouter(ROUTES);

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
    <StrictMode>
      <World.Provider value={{ flash, notify, token, auth, deauth, stats }}>
        <ApolloProvider client={CLIENT}>
          <RouterProvider router={ROUTER} />
        </ApolloProvider>
      </World.Provider>
    </StrictMode>
  );
};
