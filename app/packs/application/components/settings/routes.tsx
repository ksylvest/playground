import { Navigate, type RouteObject } from "react-router";

import { Authentications } from "./authentications";
import { Avatar } from "./avatar";
import { Billing } from "./billing";
import { Password } from "./password";
import { Profile } from "./profile";

export const SETTINGS_ROUTES: RouteObject[] = [
  {
    path: "avatar",
    element: <Avatar />,
  },
  {
    path: "billing",
    element: <Billing />,
  },
  {
    path: "password",
    element: <Password />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "authentications",
    element: <Authentications />,
  },
  {
    index: true,
    element: <Navigate to="profile" />,
  },
];
