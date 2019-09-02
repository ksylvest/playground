import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { Dialog } from "./auth/dialog";

const Auth: React.FC<RouteComponentProps> = ({ location, history }) => {
  const { state } = location;
  if (!state || !state.auth) { return null; }

  return (
    <Dialog
      onCancel={() => history.replace(location.pathname)}
      onAuth={() => history.replace(location.pathname)}
    />
  );
};

const AuthWithRouter = withRouter(Auth);
export { AuthWithRouter as Auth };
