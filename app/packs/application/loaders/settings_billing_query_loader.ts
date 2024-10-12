import { type LoaderFunction } from "react-router";

import {
  SettingsBillingDocument,
  type SettingsBillingQuery,
  type SettingsBillingQueryVariables,
} from "@root/app_schema";

import { CLIENT } from "@application/config/apollo";

import { AUTH_LOADER } from "./auth_loader";

export const SETTINGS_BILLING_QUERY_LOADER: LoaderFunction = async (args) => {
  const response = await AUTH_LOADER(args);
  if (response) return response;

  const { data } = await CLIENT.query<SettingsBillingQuery, SettingsBillingQueryVariables>({
    query: SettingsBillingDocument,
  });

  return data;
};
