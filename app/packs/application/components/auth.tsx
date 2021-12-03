import * as React from "react";
import { useLocation, useNavigate } from "react-router";

import { Dialog } from "./auth/dialog";

export const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  if (!state || !state.auth) {
    return null;
  }

  const onChange = (): void => navigate(location.pathname, { replace: true });

  return <Dialog onCancel={onChange} onAuth={onChange} />;
};
