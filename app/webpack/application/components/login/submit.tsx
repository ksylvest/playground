import * as React from "react";
import { useContext } from "react";

import { Button } from "tights";

import { Context } from "./context";

export const Submit: React.FC = () => {
  const { loading } = useContext(Context);
  return (
    <Button type="submit" loading={loading} color="primary">
      Login
    </Button>
  );
};
