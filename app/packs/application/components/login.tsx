import React from "react";
import { useContext } from "react";

import { World } from "@application/contexts/world";
import { Title } from "./helpers/title";

import { Authenticator } from "./authenticator";

import { Controls } from "./login/controls";
import { Fields } from "./login/fields";
import { Form } from "./login/form";

export const Login: React.FC = () => {
  const { auth } = useContext(World);

  return (
    <Authenticator>
      <Title>Login | Playground</Title>

      <Form onAuth={auth}>
        <Fields />
        <Controls />
      </Form>
    </Authenticator>
  );
};
