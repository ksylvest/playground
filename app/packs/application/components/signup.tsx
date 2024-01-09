import React from "react";
import { useContext } from "react";

import { World } from "@application/contexts/world";
import { Title } from "./helpers/title";

import { Authenticator } from "./authenticator";

import { Controls } from "./signup/controls";
import { Fields } from "./signup/fields";
import { Form } from "./signup/form";

export const Signup: React.FC = () => {
  const { auth } = useContext(World);

  return (
    <Authenticator>
      <Title>Signup | Playground</Title>

      <Form onAuth={auth}>
        <Fields />
        <Controls />
      </Form>
    </Authenticator>
  );
};
