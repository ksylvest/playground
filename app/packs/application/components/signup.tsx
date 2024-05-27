import React from "react";

import { Authenticator } from "./authenticator";
import { Title } from "./helpers/title";
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
