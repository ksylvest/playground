import * as React from "react";
import { Link } from "react-router-dom";

import { Breadcrumb } from "tights";

import { PROFILE_URL, ROOT_URL } from "@application/config/routes";

export const Breadcrumbs: React.FC<{ id: string }> = ({ id }) => (
  <Breadcrumb>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Link to={ROOT_URL}>Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>
        <Link to={PROFILE_URL({ id })}>Details</Link>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb>
);
