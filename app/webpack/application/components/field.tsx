import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import * as React from "react";

import { IErrors } from "../types";

import { sentence } from "../utilities";

export const Field: React.FC<{
  icon: "envelope" | "lock" | "info";
  type: "email" | "password" | "text";
  field: string;
  value: string;
  label: string;
  placeholder: string;
  errors?: IErrors;
  onValue(value: string | undefined): void;
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
    onValue(event.target.value || undefined);
  };

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className={classnames("input", { "is-success": valid, "is-danger": invalid })}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        <span className="icon is-small is-left"><FontAwesomeIcon icon={icon} /></span>
        <span className="icon is-small is-right">
          {valid && <FontAwesomeIcon icon="check-square" />}
          {invalid && <FontAwesomeIcon icon="exclamation-circle" />}
        </span>
        {help && <p className="help is-danger">{help}</p>}
      </div>
    </div>
  );
};
