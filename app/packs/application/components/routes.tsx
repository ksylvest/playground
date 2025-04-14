import { type RouteObject } from "react-router";

import { FEED_ENTRY_LOADER } from "@application/loaders/feed_entry_loader";
import { FEED_LOADER } from "@application/loaders/feed_loader";
import { NOTIFICATIONS_LOADER } from "@application/loaders/notifications_loader";
import { PROFILE_LOADER } from "@application/loaders/profile_loader";

import { Details } from "./feed/details";
import { List } from "./feed/list";
import { Layout } from "./layout";
import { Login } from "./login";
import { Notifications } from "./notifications";
import { Profile } from "./profile";
import { Settings } from "./settings";
import { SETTINGS_ROUTES } from "./settings/routes";
import { Signup } from "./signup";

export const ROUTES: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <List />,
        loader: FEED_LOADER,
      },
      {
        path: "feed/entries/:id",
        element: <Details />,
        loader: FEED_ENTRY_LOADER,
      },
      {
        path: "profile/:id",
        element: <Profile />,
        loader: PROFILE_LOADER,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "notifications",
        element: <Notifications />,
        loader: NOTIFICATIONS_LOADER,
      },
      {
        path: "settings",
        element: <Settings />,
        children: SETTINGS_ROUTES,
      },
    ],
  },
];
