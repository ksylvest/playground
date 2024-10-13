import { type LoaderFunction } from "react-router";

import { NotificationsDocument, type NotificationsQuery, type NotificationsQueryVariables } from "@root/app_schema";

import { CLIENT } from "@application/config/apollo";

import { AUTH_LOADER } from "./auth_loader";

export const NOTIFICATIONS_LOADER: LoaderFunction = async (args) => {
  const response = await AUTH_LOADER(args);
  if (response) return response;

  const { data } = await CLIENT.query<NotificationsQuery, NotificationsQueryVariables>({
    query: NotificationsDocument,
  });

  return data;
};
