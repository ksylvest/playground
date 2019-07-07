import {
  useEffect,
  useState,
} from "react";

export enum ActionCableSubscriptionStatus {
  Connected = "CONNECTED",
  Disconnected = "DISCONNECTED",
}

export const useActionCableSubscription = (() => {
  if (typeof(window) === "undefined") {
    return () => { /* noop */ };
  }

  const ActionCable = require("actioncable");

  const CLIENT: ActionCable.Cable = ActionCable.createConsumer();

  return <T>(to: ActionCable.ChannelNameWithParams, received: (data: T) => void) => {
    const [status, setStatus] = useState<ActionCableSubscriptionStatus | undefined>(undefined);

    useEffect(() => {
      if (!CLIENT) { return; }
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
})();
