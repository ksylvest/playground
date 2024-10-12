import { type LoaderFunction } from "react-router";

import { SettingsAvatarDocument, type SettingsAvatarQuery, type SettingsAvatarQueryVariables } from "@root/app_schema";

import { CLIENT } from "@application/config/apollo";

import { AUTH_LOADER } from "./auth_loader";

export const SETTINGS_AVATAR_QUERY_LOADER: LoaderFunction = async (args) => {
  const response = await AUTH_LOADER(args);
  if (response) return response;

  const { data } = await CLIENT.query<SettingsAvatarQuery, SettingsAvatarQueryVariables>({
    query: SettingsAvatarDocument,
  });

  return data;
};
