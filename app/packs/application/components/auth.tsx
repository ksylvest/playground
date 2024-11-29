import { useLocation, useNavigate } from "react-router";

import { Dialog } from "./auth/dialog";

export const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as undefined | { auth?: boolean };
  if (!state?.auth) {
    return null;
  }

  const onChange = () => navigate(location.pathname, { replace: true });

  return <Dialog onCancel={onChange} onAuth={onChange} />;
};
