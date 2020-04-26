import * as ActionCable from "@rails/actioncable";
import { useEffect, useState } from "react";

const URL = "/cable";
const CLIENT = new ActionCable.Consumer(URL);

export enum ActionCableSubscriptionStatus {
  Connected = "CONNECTED",
  Disconnected = "DISCONNECTED",
}

export const useActionCableSubscription = <T>(
  to: { channel: string },
  received: (data: T) => void
): { status?: ActionCableSubscriptionStatus } => {
  const [status, setStatus] = useState<ActionCableSubscriptionStatus | undefined>(undefined);

  useEffect(() => {
    const subscription = CLIENT.subscriptions.create(to, {
      connected: () => setStatus(ActionCableSubscriptionStatus.Connected),
      disconnected: () => setStatus(ActionCableSubscriptionStatus.Disconnected),
      received,
    });
    return (): void => {
      subscription.unsubscribe();
    };
  }, [to]);

  return { status };
};
