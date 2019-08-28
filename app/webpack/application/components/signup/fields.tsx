import * as React from "react";
import { useContext } from "react";

import { sentence } from "@application/utilities";

import { Notification } from "tights";

import { Field } from "@application/components/field";

import { Context } from "./context";

export const Fields: React.FC = () => {
  const { input, errors, onChange } = useContext(Context);
  return (
    <>
      {errors && errors.messages.base &&
        <Notification color="danger">{sentence(errors.messages.base)}</Notification>
      }

      <Field
        icon="info"
        type="text"
        field="name"
        value={input.name}
        label="Name"
        placeholder="Name"
        errors={errors}
        onValue={(name) => onChange({ ...input, name })}
      />

      <Field
        icon="envelope"
        type="email"
        field="email"
        value={input.email}
        label="Email"
        placeholder="Email"
        errors={errors}
        onValue={(email) => onChange({ ...input, email })}
      />

      <Field
        icon="lock"
        type="password"
        field="password"
        value={input.password}
        label="Password"
        placeholder="Password"
        errors={errors}
        onValue={(password) => onChange({ ...input, password })}
      />
    </>
  );
};
