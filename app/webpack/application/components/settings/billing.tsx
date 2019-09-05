import * as React from "react";
import { useQuery } from "react-apollo";

import { Title } from "@application/components/helpers";

import { Sources } from "./billing/sources";

import { IBillingCustomer } from "@application/types";

import * as QUERY from "./billing/query.gql";

interface IQueryData {
  billing: {
    customer?: IBillingCustomer;
  };
}

export const Billing: React.FC = () => {
  const { data, refetch } = useQuery<IQueryData>(QUERY);
  const billing = data && data.billing;
  const customer = billing && billing.customer;
  const sources = customer && customer.sources;

  return (
    <>
      <Title>Settings - Billing | Playground</Title>

      <h2 className="title">Billing</h2>
      <hr />

      <Sources sources={sources || []} refetch={refetch} />
    </>
  );
};
