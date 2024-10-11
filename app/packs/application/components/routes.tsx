import { type RouteObject } from "react-router";

import { FEED_ENTRY_QUERY_LOADER } from "@application/loaders/feed_entry_query_loader";
import { FEED_QUERY_LOADER } from "@application/loaders/feed_query_loader";
import { PROFILE_QUERY_LOADER } from "@application/loaders/profile_query_loader";

import { Layout } from "./Layout";
import { Details } from "./feed/details";
import { List } from "./feed/list";
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
        loader: FEED_QUERY_LOADER,
      },
      {
        path: "feed/entries/:id",
        element: <Details />,
        loader: FEED_ENTRY_QUERY_LOADER,
      },
      {
        path: "profile/:id",
        element: <Profile />,
        loader: PROFILE_QUERY_LOADER,
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
      },
      {
        path: "settings",
        element: <Settings />,
        children: SETTINGS_ROUTES,
      },
    ],
  },
];
