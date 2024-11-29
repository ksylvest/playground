import { useContext } from "react";

import { type IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";

import { InputField } from "@root/application/components/input_field";

import { Flashes } from "@application/components/flashes";

import { Context } from "./context";

const FIELDS: Array<{
  icon: IconProp;
  label: string;
  name: "name" | "email" | "password";
  type: string;
}> = [
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
        <InputField
          key={key}
          {...field}
          errors={errors}
          value={input[field.name]}
          onValue={(value): void => onChange({ ...input, [field.name]: value })}
        />
      ))}
    </>
  );
};
