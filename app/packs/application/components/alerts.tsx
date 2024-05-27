import React from "react";
import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router";

import { Notification } from "tights";

import { Flash } from "@application/types/flash";

import { World } from "@application/contexts/world";

const COLORS: { [key: string]: "info" | "warning" } = {
  alert: "warning",
  notice: "info",
};

export const Alerts: React.FC = () => {
  const { flash, notify } = useContext(World);
  const location = useLocation();
  const state = location.state as { flash?: Flash } | undefined;

  useEffect((): void => {
    notify(state?.flash ? state.flash : undefined);
  }, [state, notify]);

  if (!flash) {
    return null;
  }

  return <Notification children={flash.message} color={COLORS[flash.kind]} />;
};
