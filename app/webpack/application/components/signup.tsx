import * as React from "react";
import { useContext } from "react";

import { Context } from "./context";
import { Title } from "./helpers";

import { Controls } from "./signup/controls";
import { Fields } from "./signup/fields";
import { Form } from "./signup/form";

export const Signup: React.FC = () => {
  const { auth } = useContext(Context);

  return (
    <>
      <Title>Settings - Signup | Playground</Title>

      <Form onAuth={auth}>
        <Fields />
        <Controls />
      </Form>
    </>
  );
};
