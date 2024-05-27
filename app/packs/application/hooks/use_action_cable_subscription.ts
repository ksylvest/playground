import { useEffect, useRef, useState } from "react";

import * as ActionCable from "@rails/actioncable";

import { useLocalStorage } from "./use_local_storage";

const URL = "/cable";

export enum Status {
  Connected = "connected",
  Disconnected = "disconnected",
}

export const useActionCableSubscription = <T>(channel: string, callback?: (data: T) => void): Status | undefined => {
  const [token] = useLocalStorage("token");

  const [status, setStatus] = useState<Status | undefined>(undefined);
  const ref = useRef(callback);

  useEffect(() => {
    if (!token) return;
    const client = new ActionCable.Consumer(`${URL}?token=${token}`);

    const subscription = client.subscriptions.create(
      {
        channel,
        token,
      },
      {
        connected: () => setStatus(Status.Connected),
        disconnected: () => setStatus(Status.Disconnected),
        received: (data: T) => {
          if (ref.current) {
            ref.current(data);
          }
        },
      },
    );
    return (): void => {
      subscription.unsubscribe();
    };
  }, [channel]);

  return status;
};
