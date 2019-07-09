import * as React from "react";
import { useState } from "react";
import { useQuery } from "react-apollo";
import { Helmet } from "react-helmet";

import { useActionCableSubscription } from "@application/utils/hooks";

import { ISession } from "@application/types";

import { List } from "./sessions/list";
import { Revoke } from "./sessions/revoke";

import * as QUERY from "./sessions/query.gql";

interface IQueryData {
  sessions: ISession[];
}

export const Sessions: React.FC = () => {
  const [revoking, setRevoking] = useState<ISession | undefined>();
  const { data, refetch } = useQuery<IQueryData>(QUERY);
  const sessions = data ? data.sessions : undefined;

  useActionCableSubscription({ channel: "PresenceChannel" }, refetch);

  const onClose = () => {
    setRevoking(undefined);
    refetch();
  };

  return (
    <>
      <Helmet>
        <title>Settings - Sessions | Playground</title>
      </Helmet>

      <h2 className="title">Sessions</h2>
      <h4 className="subtitle">
        This is a listing of clients that can access your account.
        Revoke any sessions that you do not recognize or trust.
      </h4>

      <hr />

      <List sessions={sessions} onRevoke={setRevoking} />
      {revoking && <Revoke session={revoking} onClose={onClose} />}
    </>
  );
};
