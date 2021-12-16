import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import * as React from "react";
import { useContext } from "react";

import { Button, Column, Columns, Icon, Message } from "tights";

import { AuthenticationFragment, AuthenticationStatusEnum } from "@root/app_schema";

import { World } from "@application/contexts";

import { GeographySummary } from "@application/components/helpers";

const color = (status: AuthenticationStatusEnum): "info" | "light" => {
  switch (status) {
    case AuthenticationStatusEnum.Online:
      return "info";
    case AuthenticationStatusEnum.Offline:
      return "light";
  }
};

export const Entry: React.FC<{
  authentication: AuthenticationFragment;
  onRevoke(authentication: AuthenticationFragment): void;
}> = ({ authentication, onRevoke }) => {
  const { authentication: current } = useContext(World);
  const me = current && authentication.id === current.id;

  return (
    <Message color={(me && "info") || undefined}>
      <Message.Body>
        <Columns mobile desktop vcentered>
          <Column narrow>
            <Icon color={color(authentication.status)}>
              <FontAwesomeIcon icon={faCircle} />
            </Icon>
          </Column>
          <Column narrow>{authentication.ip}</Column>
          <Column>{DateTime.fromISO(authentication.seen).toLocaleString(DateTime.DATETIME_MED)}</Column>
          <Column>{authentication.geography && <GeographySummary geography={authentication.geography} />}</Column>
          <Column narrow>
            {me ? (
              <Button outlined disabled>
                Current
              </Button>
            ) : (
              <Button outlined color="danger" onClick={(): void => onRevoke(authentication)}>
                Revoke
              </Button>
            )}
          </Column>
        </Columns>
      </Message.Body>
    </Message>
  );
};
