import * as React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { Breadcrumb } from "tights";

import { ROOT_URL } from "@application/config/routes";

interface ILink {
  name: string;
  to: string;
}

const HOME_LINK: ILink = { name: "Home", to: ROOT_URL };

export const Breadcrumbs: React.FC<{ links: ILink[] }> = ({ links }) => {
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
