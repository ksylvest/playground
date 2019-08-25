import {
  useEffect,
  useState,
} from "react";

import { CLIENT } from "@application/libraries/actioncable";

export enum ActionCableSubscriptionStatus {
  Connected = "CONNECTED",
  Disconnected = "DISCONNECTED",
}

export const useActionCableSubscription = <T>(to: any, received: (data: T) => void) => {
  const [status, setStatus] = useState<ActionCableSubscriptionStatus | undefined>(undefined);

  useEffect(() => {
    const subscription = CLIENT.subscriptions.create(to, {
      connected: () => setStatus(ActionCableSubscriptionStatus.Connected),
      disconnected: () => setStatus(ActionCableSubscriptionStatus.Disconnected),
      received,
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [to]);

  return {
    status,
  };
};
