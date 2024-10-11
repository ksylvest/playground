import { useContext } from "react";
import { useLocation } from "react-router";
import { Link, Navigate } from "react-router-dom";

import { Tabs, TabsItem, TabsList } from "tights";

import { ROOT_URL } from "@application/config/routes";

import { World } from "@application/contexts/world";

export const Authenticator: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { token } = useContext(World);
  const location = useLocation();
  const state = location.state as { back?: string } | undefined;

  if (token) return <Navigate to={state?.back ?? ROOT_URL} />;

  return (
    <>
      <Tabs>
        <TabsList>
          <TabsItem active={location.pathname === "/login"}>
            <Link to="/login" state={location.state}>
              Login
            </Link>
          </TabsItem>
          <TabsItem active={location.pathname === "/signup"}>
            <Link to="/signup" state={location.state}>
              Signup
            </Link>
          </TabsItem>
        </TabsList>
      </Tabs>
      {children}
    </>
  );
};
