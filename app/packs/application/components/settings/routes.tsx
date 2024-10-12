import { Navigate, type RouteObject } from "react-router";

import { SETTINGS_AUTHENTICTIONS_QUERY_LOADER } from "@application/loaders/settings_authentications_query_loader";
import { SETTINGS_AVATAR_QUERY_LOADER } from "@application/loaders/settings_avatar_query_loader";
import { SETTINGS_BILLING_QUERY_LOADER } from "@application/loaders/settings_billing_query_loader";
import { SETTINGS_PASSWORD_QUERY_LOADER } from "@application/loaders/settings_password_query_loader";
import { SETTINGS_PROFILE_QUERY_LOADER } from "@application/loaders/settings_profile_query_loader";

import { Authentications } from "./authentications";
import { Avatar } from "./avatar";
import { Billing } from "./billing";
import { Password } from "./password";
import { Profile } from "./profile";

export const SETTINGS_ROUTES: RouteObject[] = [
  {
    path: "avatar",
    element: <Avatar />,
    loader: SETTINGS_AVATAR_QUERY_LOADER,
  },
  {
    path: "billing",
    element: <Billing />,
    loader: SETTINGS_BILLING_QUERY_LOADER,
  },
  {
    path: "password",
    element: <Password />,
    loader: SETTINGS_PASSWORD_QUERY_LOADER,
  },
  {
    path: "profile",
    element: <Profile />,
    loader: SETTINGS_PROFILE_QUERY_LOADER,
  },
  {
    path: "authentications",
    element: <Authentications />,
    loader: SETTINGS_AUTHENTICTIONS_QUERY_LOADER,
  },
  {
    index: true,
    element: <Navigate to="profile" />,
  },
];
