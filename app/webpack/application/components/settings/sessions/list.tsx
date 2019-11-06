import * as React from "react";

import { SessionFragment } from "@root/app_schema";

import { Entry } from "./entry";

export const List: React.FC<{
  sessions?: SessionFragment[];
  onRevoke(session: SessionFragment): void;
}> = ({ sessions, onRevoke }) => (
  <>
    {sessions?.filter(({ deleted }) => !deleted).map((session) => <Entry key={session.id} session={session} onRevoke={onRevoke} />)}
  </>
);
