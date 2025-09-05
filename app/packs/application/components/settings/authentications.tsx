import { useState } from "react";

import { useQuery } from "@apollo/client/react";

import { AuthenticationFragment, SettingsAuthenticationsDocument } from "@root/app_schema";

import { useActionCableSubscription } from "@application/hooks/use_action_cable_subscription";

import { Title } from "@application/components/helpers/title";

import { List } from "./authentications/list";
import { Revoke } from "./authentications/revoke";

export const Authentications: React.FC = () => {
  const [revoking, setRevoking] = useState<AuthenticationFragment | undefined>();
  const { data, refetch } = useQuery(SettingsAuthenticationsDocument);
  const authentications = data?.authentications;

  useActionCableSubscription("PresenceChannel", refetch);

  const onClose = (): void => {
    setRevoking(undefined);
  };

  return (
    <>
      <Title>Settings - Authentications | Playground</Title>

      <h2 className="title">Authentications</h2>
      <h4 className="subtitle">
        This is a listing of clients that can access your account. Revoke any authentications that you do not recognize
        or trust.
      </h4>

      <hr />

      <List authentications={authentications} onRevoke={setRevoking} />
      {revoking && <Revoke authentication={revoking} onClose={onClose} />}
    </>
  );
};
