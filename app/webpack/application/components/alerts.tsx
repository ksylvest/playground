import * as React from "react";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router";

import { World } from "@application/contexts";

import { Notification } from "tights";

export const Alerts: React.FC = () => {
  const { flash, notify } = useContext(World);
  const location = useLocation();

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
