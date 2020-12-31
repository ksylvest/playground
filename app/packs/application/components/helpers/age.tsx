import { DateTime } from "luxon";
import * as React from "react";

export const Age: React.FC<{ datetime: string }> = ({ datetime }) => {
  return <>{DateTime.fromISO(datetime).toLocaleString(DateTime.DATETIME_MED)}</>;
};
