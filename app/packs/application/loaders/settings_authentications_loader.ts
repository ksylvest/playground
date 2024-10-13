import { type LoaderFunction } from "react-router";

import {
  SettingsAuthenticationsDocument,
  type SettingsAuthenticationsQuery,
  type SettingsAuthenticationsQueryVariables,
} from "@root/app_schema";

import { CLIENT } from "@application/config/apollo";

import { AUTH_LOADER } from "./auth_loader";

export const SETTINGS_AUTHENTICTIONS_LOADER: LoaderFunction = async (args) => {
  const response = await AUTH_LOADER(args);
  if (response) return response;

  const { data } = await CLIENT.query<SettingsAuthenticationsQuery, SettingsAuthenticationsQueryVariables>({
    query: SettingsAuthenticationsDocument,
  });

  return data;
};
