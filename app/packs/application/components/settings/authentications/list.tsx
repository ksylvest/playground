import { AuthenticationFragment } from "@root/app_schema";

import { Entry } from "./entry";

export const List: React.FC<{
  authentications?: readonly AuthenticationFragment[];
  onRevoke(authentication: AuthenticationFragment): void;
}> = ({ authentications, onRevoke }) => (
  <>
    {authentications
      ?.filter(({ deleted }) => !deleted)
      .map((authentication) => (
        <Entry key={authentication.id} authentication={authentication} onRevoke={onRevoke} />
      ))}
  </>
);
