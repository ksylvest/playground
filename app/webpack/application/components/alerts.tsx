import * as React from "react";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router";

import { Notification } from "tights";

import { World } from "@application/contexts";

import { IFlash } from "@application/types";

export const Alerts: React.FC = () => {
  const { flash, notify } = useContext(World);
  const location = useLocation<{ flash?: IFlash }>();

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
