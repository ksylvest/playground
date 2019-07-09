import * as React from "react";

import { ISession } from "@application/types";

import { Entry } from "./entry";

export const List: React.FC<{
  sessions?: ISession[];
  onRevoke(session: ISession): void;
}> = ({
  sessions,
  onRevoke,
}) => (
  <>{sessions && sessions.map((session) => <Entry key={session.id} session={session} onRevoke={onRevoke} />)}</>
);
