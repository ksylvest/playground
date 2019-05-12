import * as React from "react";
import { Query } from "react-apollo";

import { ISession } from "@application/types";

import * as QUERY from "./sessions/query.gql";

interface IQueryData {
  sessions: ISession[];
}

export const Sessions: React.FC = () => (
  <>
    <h2 className="title">Sessions</h2>
    <h4 className="subtitle">
      This is a listing of clients that can access your account.
      Revoke any sessions that you do not recognize or trust.
    </h4>

    <hr />

    <Query<IQueryData> query={QUERY}>
      {({ data }) => {
        if (!data || !data.sessions) { return null; }
        return (
          <table className="table is-fullwidth">
            <tbody>
              {data.sessions.map(({ id, ip }) => (
                <tr key={id}>
                  <td>{ip}</td>
                  <td>
                    <button type="button" className="button">
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }}
    </Query>
  </>
);
