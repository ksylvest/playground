import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import * as React from "react";
import { useContext } from "react";

import { Button, Column, Columns, Icon, Message } from "tights";

import { SessionFragment, SessionStatusEnum } from "@root/app_schema";

import { World } from "@application/contexts";

import { GeographySummary } from "@application/components/helpers";

const color = (status: SessionStatusEnum) => {
  switch (status) {
    case SessionStatusEnum.Online:
      return "info";
    case SessionStatusEnum.Offline:
      return "light";
  }
};

export const Entry: React.FC<{
  session: SessionFragment;
  onRevoke(session: SessionFragment): void;
}> = ({ session, onRevoke }) => {
  const { session: current } = useContext(World);
  const me = current && session.id === current.id;

  return (
    <Message color={(me && "info") || undefined}>
      <Message.Body>
        <Columns mobile desktop vcentered>
          <Column narrow>
            <Icon color={color(session.status)}>
              <FontAwesomeIcon icon={faCircle} />
            </Icon>
          </Column>
          <Column narrow>{session.ip}</Column>
          <Column>{DateTime.fromISO(session.seen).toLocaleString(DateTime.DATETIME_MED)}</Column>
          <Column>{session.geography && <GeographySummary geography={session.geography} />}</Column>
          <Column narrow>
            {me ? (
              <Button outlined disabled>
                Current
              </Button>
            ) : (
              <Button outlined color="danger" onClick={() => onRevoke(session)}>
                Revoke
              </Button>
            )}
          </Column>
        </Columns>
      </Message.Body>
    </Message>
  );
};
