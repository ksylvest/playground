import * as React from "react";
import { useState } from "react";

import { IErrors } from "@application/types";

import { sentence } from "@application/utilities";

import {
  Button,
  Form,
  Notification,
} from "@application/components/bulma";

import { Field } from "@application/components/field";

export const Fields: React.FC<{
  loading: boolean;
  errors?: IErrors;
  save(variables: {
    name: string;
    email: string;
    password: string;
  }): void;
}> = ({
  loading,
  errors,
  save,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    save({
      email,
      name,
      password,
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      {errors && errors.messages.base &&
        <Notification color="danger">{sentence(errors.messages.base)}</Notification>
      }

      <Field
        icon="info"
        type="text"
        field="name"
        value={name}
        label="Name"
        placeholder="Name"
        errors={errors}
        onValue={setName}
      />

      <Field
        icon="envelope"
        type="email"
        field="email"
        value={email}
        label="Email"
        placeholder="Email"
        errors={errors}
        onValue={setEmail}
      />

      <Field
        icon="lock"
        type="password"
        field="password"
        value={password}
        label="Password"
        placeholder="Password"
        errors={errors}
        onValue={setPassword}
      />

      <Form.Field>
        <Form.Control>
          <Button type="submit" loading={loading} color="primary">Signup</Button>
        </Form.Control>
      </Form.Field>
    </Form>
  );
};
