import * as React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { Breadcrumb } from "tights";

import { ROOT_URL } from "@application/config/routes";

const HOME_LINK = { name: "Home", to: ROOT_URL };

export const Breadcrumbs: React.FC<{
  links: Array<{
    name: string;
    to: string;
  }>;
}> = ({ links }) => {
  const location = useLocation();
  return (
    <Breadcrumb>
      <Breadcrumb.List>
        {[HOME_LINK, ...links].map((link, index) => (
          <Breadcrumb.Item key={index} active={link.to === location.pathname}>
            <Link to={link.to}>{link.name}</Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb.List>
    </Breadcrumb>
  );
};
