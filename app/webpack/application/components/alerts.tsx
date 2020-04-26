import * as React from "react";
import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router";

import { Notification } from "tights";

import { World } from "@application/contexts";

import { Flash } from "@application/types";

const COLORS: { [key: string]: "info" | "warning" } = {
  alert: "warning",
  notice: "info",
};

export const Alerts: React.FC = () => {
  const { flash, notify } = useContext(World);
  const location = useLocation<{ flash?: Flash }>();

  useEffect((): void => {
    notify(location.state ? location.state.flash : undefined);
  }, [location, notify]);

  if (!flash) {
    return null;
  }

  return <Notification children={flash.message} color={COLORS[flash.kind]} />;
};
