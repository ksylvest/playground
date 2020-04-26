import * as React from "react";
import { useLocation, useHistory } from "react-router";

import { Dialog } from "./auth/dialog";

export const Auth: React.FC = () => {
  const location = useLocation<{ auth: boolean }>();
  const history = useHistory();
  const { state } = location;
  if (!state || !state.auth) {
    return null;
  }

  const onChange = () => history.replace(location.pathname);

  return <Dialog onCancel={onChange} onAuth={onChange} />;
};
