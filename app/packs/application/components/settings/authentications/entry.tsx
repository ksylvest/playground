import { Button, Column, Columns, Icon, Message, MessageBody } from "tights";

import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthenticationFragment, AuthenticationStatusEnum } from "@root/app_schema";

import { Age } from "@application/components/helpers/age";
import { GeographySummary } from "@application/components/helpers/geography_summary";

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
}> = ({ authentication, onRevoke }) => (
  <Message color={authentication.me ? "info" : undefined}>
    <MessageBody>
      <Columns mobile desktop vcentered>
        <Column narrow>
          <Icon color={color(authentication.status)}>
            <FontAwesomeIcon icon={faCircle} />
          </Icon>
        </Column>
        <Column narrow>{authentication.ip}</Column>
        <Column>
          <Age datetime={authentication.seen} />
        </Column>
        <Column>{authentication.geography && <GeographySummary geography={authentication.geography} />}</Column>
        <Column narrow>
          {authentication.me ? (
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
    </MessageBody>
  </Message>
);
