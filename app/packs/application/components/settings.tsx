import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Column, Columns } from "tights";

import { Title } from "@application/components/helpers/title";

import { Authentications } from "./settings/authentications";
import { Avatar } from "./settings/avatar";
import { Billing } from "./settings/billing";
import { Password } from "./settings/password";
import { Profile } from "./settings/profile";
import { Sidebar } from "./settings/sidebar";

export const Settings: React.FC = () => (
  <>
    <Title>Settings | Playground</Title>

    <Columns>
      <Column size={3}>
        <Sidebar />
      </Column>
      <Column size={9}>
        <Routes>
          <Route path="avatar" element={<Avatar />} />
          <Route path="billing" element={<Billing />} />
          <Route path="password" element={<Password />} />
          <Route path="profile" element={<Profile />} />
          <Route path="authentications" element={<Authentications />} />
          <Route index element={<Navigate to={"profile"} />} />
        </Routes>
      </Column>
    </Columns>
  </>
);
