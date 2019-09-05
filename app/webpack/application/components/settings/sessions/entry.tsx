import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import * as React from "react";
import { useContext } from "react";

import {
  ISession,
  SessionStatus,
} from "@application/types";

import { World } from "@application/contexts";

import {
  Button,
  Column,
  Columns,
  Icon,
  Message,
} from "tights";

export const Entry: React.FC<{
  session: ISession;
  onRevoke(session: ISession): void;
}> = ({
  session,
  onRevoke,
}) => {
  const { session: current } = useContext(World);
  const me = current && session.id === current.id;
  const status = (() => {
    switch (session.status) {
      case SessionStatus.Online: return "info";
      case SessionStatus.Offline: return "light";
    }
  })();

  return (
    <Message color={me && "info" || undefined}>
      <Message.Body>
        <Columns mobile desktop vcentered>
          <Column narrow>
            <Icon color={"info" || status}>
              <FontAwesomeIcon icon={faCircle} />
            </Icon>
          </Column>
          <Column narrow>
            {session.ip}
          </Column>
          <Column>
            {DateTime.fromISO(session.seen).toLocaleString(DateTime.DATETIME_MED)}
          </Column>
          <Column>
            {session.geography &&
              <>{session.geography.city}, {session.geography.region}, {session.geography.country}</>}
          </Column>
          <Column narrow>
            {me
              ? <Button outlined disabled>Current</Button>
              : <Button outlined color="danger" onClick={() => onRevoke(session)}>Revoke</Button>
            }
          </Column>
        </Columns>
      </Message.Body>
    </Message>
  );
};
