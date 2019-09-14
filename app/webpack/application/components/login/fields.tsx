import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { useContext } from "react";

import { sentence } from "@application/utilities";

import { Notification } from "tights";

import { Field } from "@application/components/field";

import { Context } from "./context";

interface IField {
  icon: IconProp;
  name: "email" | "password";
  label: string;
  type: string;
}

const FIELDS: IField[] = [
  {
    icon: faEnvelope,
    label: "Email",
    name: "email",
    type: "email",
  },
  {
    icon: faLock,
    label: "Password",
    name: "password",
    type: "password",
  },
];

export const Fields: React.FC = () => {
  const { input, errors, onChange } = useContext(Context);
  return (
    <>
      {errors && errors.messages.base && <Notification color="danger">{sentence(errors.messages.base)}</Notification>}

      {FIELDS.map((field, key) => (
        <Field
          key={key}
          {...field}
          errors={errors}
          value={input[field.name]}
          onValue={(value) => onChange({ ...input, [field.name]: value })}
        />
      ))}
    </>
  );
};
