import * as React from "react";
import {
  useContext,
  useEffect,
} from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { Context } from "./context";

import { Notification } from "tights";

const Alerts: React.FC<RouteComponentProps> = ({ location }) => {
  const { flash, notify } = useContext(Context);

  useEffect(() => {
    notify(location.state ? location.state.flash : undefined);
  }, [location]);

  if (!flash) { return null; }

  return (
    <Notification
      children={flash.message}
      color={(() => {
        switch (flash.kind) {
          case "alert": return "warning";
          case "notice": return "info";
        }
      })()}
    />
  );
};

const AlertsWithRouter = withRouter(Alerts);
export  { AlertsWithRouter as Alerts };
