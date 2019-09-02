import * as React from "react";
import { useContext } from "react";

import { World } from "@application/contexts";
import { Title } from "./helpers";

import { Controls } from "./login/controls";
import { Fields } from "./login/fields";
import { Form } from "./login/form";

export const Login: React.FC = () => {
  const { auth } = useContext(World);

  return (
    <>
      <Title>Settings - Login | Playground</Title>

      <Form onAuth={auth}>
        <Fields />
        <Controls />
      </Form>
    </>
  );
};
