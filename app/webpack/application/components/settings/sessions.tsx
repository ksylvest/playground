import * as React from "react";
import { useState } from "react";
import { Query } from "react-apollo";

import { ISession } from "@application/types";

import { List } from "./sessions/list";
import { Revoke } from "./sessions/revoke";

import * as QUERY from "./sessions/query.gql";

interface IQueryData {
  sessions: ISession[];
}

export const Sessions: React.FC = () => {
  const [revoking, setRevoking] = useState<ISession | undefined>();
  return (
    <>
      <h2 className="title">Sessions</h2>
      <h4 className="subtitle">
        This is a listing of clients that can access your account.
        Revoke any sessions that you do not recognize or trust.
      </h4>

      <hr />

      <Query<IQueryData> query={QUERY}>
        {({ data, refetch }) => (
          <>
            <List sessions={data ? data.sessions : undefined} onRevoke={setRevoking} />
            {revoking &&
              <Revoke
                session={revoking}
                onClose={() => {
                  setRevoking(undefined);
                  refetch();
                }}
              />
            }
          </>
        )}
      </Query>
    </>
  );
};
