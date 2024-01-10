import React from "react";

import { Title } from "./helpers/title";

import { Authenticator } from "./authenticator";

import { Controls } from "./signup/controls";
import { Fields } from "./signup/fields";
import { Form } from "./signup/form";

export const Signup: React.FC = () => (
  <Authenticator>
    <Title>Signup | Playground</Title>

    <Form>
      <Fields />
      <Controls />
    </Form>
  </Authenticator>
);
