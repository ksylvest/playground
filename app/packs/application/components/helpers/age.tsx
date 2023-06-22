import React from "react";

const DATE_TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
};

export const Age: React.FC<{ datetime: string }> = ({ datetime }) => (
  <>{new Date(datetime).toLocaleString(undefined, DATE_TIME_FORMAT_OPTIONS)}</>
);
