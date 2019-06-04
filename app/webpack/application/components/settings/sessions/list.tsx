import * as React from "react";
import { useContext } from "react";

import { ISession } from "@application/types";

import { Context } from "@application/components/context";

import {
  Button,
  Table,
} from "@application/components/bulma";

export const List: React.FC<{
  sessions?: ISession[];
  onRevoke(session: ISession): void;
}> = ({
  sessions,
  onRevoke,
}) => {
  const { session: current } = useContext(Context);

  return (
    <Table fullwidth striped>
      <tbody>
        {sessions && sessions.map((session) => (
          <tr key={session.id}>
            <td>
              {session.ip}
            </td>
            <td>
              {session.geography &&
                <>{session.geography.city}, {session.geography.region}, {session.geography.country}</>}
            </td>
            <td>
              {current && current.id !== session.id
                ? <Button outlined color="danger" onClick={() => onRevoke(session)}>Revoke</Button>
                : <Button disabled>Current</Button>
              }
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
