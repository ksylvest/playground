import * as React from "react";
import { useContext } from "react";
import { useLocation } from "react-router";
import { Link, Navigate, Route, Routes } from "react-router-dom";

import { World } from "@application/contexts";

import { Tabs } from "tights";

import { Login } from "./login";
import { Signup } from "./signup";

import { ROOT_URL } from "@application/config/routes";

export const Authenticator: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { authentication } = useContext(World);
  const location = useLocation();
  const state = location.state as { back?: string } | undefined;
  if (authentication) {
    return <Navigate to={state?.back ?? ROOT_URL} />;
  }
  return (
    <>
      <Tabs>
        <Tabs.List>
          <Tabs.Item active={location.pathname === "/login"}>
            <Link to="/login" state={location.state}>
              Login
            </Link>
          </Tabs.Item>
          <Tabs.Item active={location.pathname === "/signup"}>
            <Link to="/signup" state={location.state}>
              Signup
            </Link>
          </Tabs.Item>
        </Tabs.List>
      </Tabs>
      {children}
    </>
  );
};
