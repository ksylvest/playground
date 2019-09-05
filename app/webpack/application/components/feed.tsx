import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { Details } from "./feed/details";
import { List } from "./feed/list";

import { FEED_DETAILS_URL, FEED_LIST_URL } from "@application/config/routes";

export const Feed: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path={FEED_LIST_URL} component={List} />
        <Route exact path={FEED_DETAILS_URL({ id: ":id" })} render={({ match }) => <Details id={match.params.id} />} />
      </Switch>
    </>
  );
};
