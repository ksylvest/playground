import { type LoaderFunction } from "react-router";

import { AUTH_LOADER } from "./auth_loader";

export const SETTINGS_PASSWORD_LOADER: LoaderFunction = async (args) => {
  const response = await AUTH_LOADER(args);
  if (response) return response;

  return null;
};
