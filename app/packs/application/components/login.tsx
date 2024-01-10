import React from "react";

import { Title } from "./helpers/title";

import { Authenticator } from "./authenticator";

import { Controls } from "./login/controls";
import { Fields } from "./login/fields";
import { Form } from "./login/form";

export const Login: React.FC = () => (
  <Authenticator>
    <Title>Login | Playground</Title>

    <Form>
      <Fields />
      <Controls />
    </Form>
  </Authenticator>
);
