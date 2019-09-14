import { faEnvelope, faInfo } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { useEffect, useState } from "react";

import { Errors } from "@root/app_schema";

import { sentence } from "@application/utilities";

import { Button, Form, Notification } from "tights";

import { Field } from "@application/components/field";

export const Fields: React.FC<{
  loading: boolean;
  errors?: Errors;
  defaults?: {
    email: string;
    name: string;
  };
  save(variables: { email: string; name: string }): void;
}> = ({ loading, errors, defaults, save }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (!defaults) {
      return;
    }
    setName(defaults.name);
    setEmail(defaults.email);
  }, [defaults]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    save({
      email,
      name,
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      {errors && errors.messages.base && <Notification color="danger">{sentence(errors.messages.base)}</Notification>}

      <Field
        icon={faInfo}
        type="text"
        field="name"
        value={name || ""}
        label="Name"
        placeholder="Name"
        errors={errors}
        onValue={setName}
      />

      <Field
        icon={faEnvelope}
        type="email"
        field="email"
        value={email || ""}
        label="Email"
        placeholder="Email"
        errors={errors}
        onValue={setEmail}
      />

      <Form.Field>
        <Form.Control>
          <Button type="submit" disabled={loading} loading={loading} color="primary">
            Save
          </Button>
        </Form.Control>
      </Form.Field>
    </Form>
  );
};
