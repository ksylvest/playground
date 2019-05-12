import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import { IErrors } from "@application/types";

import { sentence } from "@application/utilities";

import { Form } from "@application/components/bulma";

export const Field: React.FC<{
  icon: "envelope" | "lock" | "info";
  type: "email" | "password" | "text";
  field: string;
  value: string;
  label: string;
  placeholder: string;
  errors?: IErrors;
  onValue(value: string): void;
}> = ({
  icon,
  type,
  field,
  value,
  label,
  placeholder,
  errors,
  onValue,
}) => {
  const messages = errors ? errors.messages[field] : undefined;
  const help = messages ? sentence(messages) : undefined;
  const invalid = !!errors && !!messages;
  const valid = !!errors && !messages;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValue(event.target.value);
  };

  return (
    <Form.Field>
      <Form.Label>{label}</Form.Label>
      <Form.Control icons="both">
        <Form.Input
          color={errors ? (!messages ? "success" : "danger") : undefined}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        <Form.Icon size="small" alignment="left"><FontAwesomeIcon icon={icon} /></Form.Icon>
        <Form.Icon size="small" alignment="right">
          {valid && <FontAwesomeIcon icon="check-square" />}
          {invalid && <FontAwesomeIcon icon="exclamation-circle" />}
        </Form.Icon>
        {help && <Form.Help color="danger">{help}</Form.Help>}
      </Form.Control>
    </Form.Field>
  );
};
