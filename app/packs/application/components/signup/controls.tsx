import * as React from "react";

import { Form } from "tights";

import { Submit } from "./submit";

export const Controls: React.FC = () => (
  <Form.Field>
    <Form.Control>
      <Submit />
    </Form.Control>
  </Form.Field>
);
