import * as React from "react";

import { useHelloSign } from "@application/hooks";

import { useSignQuery } from "@root/app_schema";

export const Sign: React.FC = () => {
  const { data } = useSignQuery();
  useHelloSign(data?.sign);
  return null;
};
