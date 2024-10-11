import { Outlet } from "react-router-dom";

import { Column, Columns } from "tights";

import { Title } from "@application/components/helpers/title";

import { Authorize } from "./authorize";
import { Sidebar } from "./settings/sidebar";

export const Settings: React.FC = () => (
  <Authorize>
    <Title>Settings | Playground</Title>

    <Columns>
      <Column size={3}>
        <Sidebar />
      </Column>
      <Column size={9}>
        <Outlet />
      </Column>
    </Columns>
  </Authorize>
);
