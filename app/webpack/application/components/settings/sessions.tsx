import * as React from "react";
import { useState } from "react";

import { SessionFragment, useSettingsSessionsQuery } from "@root/app_schema";

import { Title } from "@application/components/helpers";

import { useActionCableSubscription } from "@application/hooks";

import { List } from "./sessions/list";
import { Revoke } from "./sessions/revoke";

export const Sessions: React.FC = () => {
  const [revoking, setRevoking] = useState<SessionFragment | undefined>();
  const { data, refetch } = useSettingsSessionsQuery();
  const sessions = data ? data.sessions : undefined;

  useActionCableSubscription({ channel: "PresenceChannel" }, refetch);

  const onClose = (): void => {
    setRevoking(undefined);
  };

  return (
    <>
      <Title>Settings - Sessions | Playground</Title>

      <h2 className="title">Sessions</h2>
      <h4 className="subtitle">
        This is a listing of clients that can access your account. Revoke any sessions that you do not recognize or
        trust.
      </h4>

      <hr />

      <List sessions={sessions} onRevoke={setRevoking} />
      {revoking && <Revoke session={revoking} onClose={onClose} />}
    </>
  );
};
