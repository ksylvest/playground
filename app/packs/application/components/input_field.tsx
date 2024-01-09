import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { sentence } from "@application/utilities/sentence";

import { Control, Field, Help, Icon, Input, Label } from "tights";

export const InputField: React.FC<{
  icon: IconProp;
  type: string;
  name: string;
  value: string;
  label: string;
  placeholder?: string;
  errors?: {
    messages: {
      [key: string]: string[];
    };
  };
  onValue(value: string): void;
}> = ({ icon, type, name, value, label, placeholder = label, errors, onValue }) => {
  const messages = errors?.messages[name];
  const help = messages && sentence(messages);
  const invalid = !!errors && !!messages;
  const valid = !!errors && !messages;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onValue(event.target.value);
  };

  return (
    <Field>
      <Label>{label}</Label>
      <Control icons="both">
        <Input
          color={errors ? (!messages ? "success" : "danger") : undefined}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        <Icon size="small" alignment="left">
          <FontAwesomeIcon icon={icon} />
        </Icon>
        <Icon size="small" alignment="right">
          {valid && <FontAwesomeIcon icon={faCheckSquare} />}
          {invalid && <FontAwesomeIcon icon={faExclamationCircle} />}
        </Icon>
        {help && <Help color="danger">{help}</Help>}
      </Control>
    </Field>
  );
};
