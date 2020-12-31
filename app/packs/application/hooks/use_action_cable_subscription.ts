import * as ActionCable from "@rails/actioncable";
import { useEffect, useRef, useState } from "react";

const URL = "/cable";
const CLIENT = new ActionCable.Consumer(URL);

export enum Status {
  Connected,
  Disconnected,
}

export const useActionCableSubscription = <T>(channel?: string, callback?: (data: T) => void): { status?: Status } => {
  const [status, setStatus] = useState<Status | undefined>(undefined);
  const ref = useRef(callback);

  useEffect(() => {
    const subscription = CLIENT.subscriptions.create(channel, {
      connected: () => setStatus(Status.Connected),
      disconnected: () => setStatus(Status.Disconnected),
      received: (data: T) => {
        if (ref.current) {
          ref.current(data);
        }
      },
    });
    return (): void => {
      subscription.unsubscribe();
    };
  }, [channel]);

  return { status };
};
