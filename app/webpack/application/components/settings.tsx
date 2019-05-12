import * as React from "react";
import { useContext } from "react";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import {
  Column,
  Columns,
  Container,
  Section,
} from "@application/components/bulma";

import { Context } from "./context";

import { Menu } from "./settings/menu";
import { Profile } from "./settings/profile";
import { Sessions } from "./settings/sessions";

import {
  ROOT_URL,
  SETTINGS_PROFILE_URL,
  SETTINGS_SESSIONS_URL,
} from "@application/config/routes";

const SESSIONS_DEFAULT_URL = SETTINGS_PROFILE_URL;

export const Settings: React.FC = () => {
  const { user } = useContext(Context);
  if (!user) { return <Redirect to={ROOT_URL} />; }
  return (
    <Container>
      <Section>
        <Columns>
          <Column size={3}>
            <Menu />
          </Column>
          <Column size={9}>
            <Switch>
              <Route
                path={SETTINGS_PROFILE_URL}
                component={Profile}
              />
              <Route
                path={SETTINGS_SESSIONS_URL}
                component={Sessions}
              />
              <Redirect to={SESSIONS_DEFAULT_URL} />
            </Switch>
          </Column>
        </Columns>
      </Section>
    </Container>
  );
};
