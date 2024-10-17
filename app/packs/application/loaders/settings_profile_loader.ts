import { type LoaderFunction } from "react-router";

import {
  SettingsProfileDocument,
  type SettingsProfileQuery,
  type SettingsProfileQueryVariables,
} from "@root/app_schema";

import { CLIENT } from "@application/config/apollo";

import { AUTH_LOADER } from "./auth_loader";

export const SETTINGS_PROFILE_LOADER: LoaderFunction = async (args) => {
  const response = await AUTH_LOADER(args);
  if (response) return response;

  const { data } = await CLIENT.query<SettingsProfileQuery, SettingsProfileQueryVariables>({
    query: SettingsProfileDocument,
  });

  return data;
};