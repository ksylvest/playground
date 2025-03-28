import { useSettingsBillingQuery } from "@root/app_schema";

import { Title } from "@application/components/helpers/title";

import { Sources } from "./billing/sources";

export const Billing: React.FC = () => {
  const { data } = useSettingsBillingQuery();
  const billing = data?.billing;
  const customer = billing?.customer;
  const sources = customer?.sources;

  return (
    <>
      <Title>Settings - Billing | Playground</Title>

      <h2 className="title">Billing</h2>
      <hr />

      <Sources sources={sources ?? []} />
    </>
  );
};
