import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { Tabs } from "tights";

import { useSettingsBillingQuery } from "@root/app_schema";

import { Title } from "@application/components/helpers";

import { Sources } from "./billing/sources";
import { Subscribe } from "./billing/subscribe";

import {
  SETTINGS_BILLING_SOURCES_URL as SOURCES_URL,
  SETTINGS_BILLING_SUBSCRIPTION_URL as SUBSCRIBE_URL,
} from "@application/config/routes";

const DEFAULT_URL = SOURCES_URL;

export const Billing: React.FC = () => {
  const { data } = useSettingsBillingQuery();
  const billing = data?.billing;
  const customer = billing?.customer;
  const products = billing?.products;
  const sources = customer?.sources;

  return (
    <>
      <Title>Settings - Billing | Playground</Title>

      <h2 className="title">Billing</h2>
      <hr />

      <Tabs>
        <Tabs.List>
          <Tabs.Item>
            <NavLink to={SOURCES_URL}>Cards</NavLink>
          </Tabs.Item>
          <Tabs.Item>
            <NavLink to={SUBSCRIBE_URL}>Subscriptions</NavLink>
          </Tabs.Item>
        </Tabs.List>
      </Tabs>

      <Switch>
        <Route path={SOURCES_URL}>
          <Sources sources={sources ?? []} />
        </Route>
        <Route path={SUBSCRIBE_URL}>
          <Subscribe products={products ?? []} />
        </Route>
        <Redirect to={DEFAULT_URL} />
      </Switch>
    </>
  );
};
