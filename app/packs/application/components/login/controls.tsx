import React from "react";

import { Field, Control } from "tights";

import { Submit } from "./submit";

export const Controls: React.FC = () => (
  <Field>
    <Control>
      <Submit />
    </Control>
  </Field>
);
