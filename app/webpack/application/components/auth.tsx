import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { Dialog } from "./auth/dialog";

const Auth: React.FC<RouteComponentProps> = ({ location, history }) => {
  const { state } = location;
  if (!state || !state.auth) {
    return null;
  }

  const onChange = () => history.replace(location.pathname);

  return <Dialog onCancel={onChange} onAuth={onChange} />;
};

const AuthWithRouter = withRouter(Auth);
export { AuthWithRouter as Auth };
