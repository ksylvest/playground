import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faInfo, faLock } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { useContext } from "react";

import { Field } from "@application/components/field";
import { Flashes } from "@application/components/flashes";

import { Context } from "./context";

interface IField {
  icon: IconProp;
  label: string;
  name: "name" | "email" | "password";
  type: string;
}

const FIELDS: IField[] = [
  {
    icon: faInfo,
    label: "Name",
    name: "name",
    type: "text",
  },
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
      <Flashes errors={errors} />

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
