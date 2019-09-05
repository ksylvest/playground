import * as React from "react";
import { useContext, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { World } from "@application/contexts";

import { Notification } from "tights";

const Alerts: React.FC<RouteComponentProps> = ({ location }) => {
  const { flash, notify } = useContext(World);

  useEffect(() => {
    notify(location.state ? location.state.flash : undefined);
  }, [location]);

  if (!flash) {
    return null;
  }

  return (
    <Notification
      children={flash.message}
      color={(() => {
        switch (flash.kind) {
          case "alert":
            return "warning";
          case "notice":
            return "info";
        }
      })()}
    />
  );
};

const AlertsWithRouter = withRouter(Alerts);
export { AlertsWithRouter as Alerts };
