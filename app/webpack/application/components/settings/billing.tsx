import * as React from "react";

import { useSettingsBillingQuery } from "@root/app_schema";

import { Title } from "@application/components/helpers";

import { Sources } from "./billing/sources";
import { Subscribe } from "./billing/subscribe";

export const Billing: React.FC = () => {
  const { data, refetch } = useSettingsBillingQuery();
  const billing = data?.billing;
  const customer = billing?.customer;
  const products = billing?.products;
  const sources = customer?.sources;

  return (
    <>
      <Title>Settings - Billing | Playground</Title>

      <h2 className="title">Billing</h2>
      <hr />

      <Sources sources={sources || []} refetch={refetch} />
      <Subscribe products={products || []} refetch={refetch} />
    </>
  );
};
