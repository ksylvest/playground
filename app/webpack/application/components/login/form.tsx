import * as classnames from "classnames";
import * as React from "react";
import { useState } from "react";

import { IErrors } from "../../types";

import { sentence } from "../../utilities";

import { Field } from "../field";

export const Form: React.FC<{
  loading: boolean;
  errors?: IErrors;
  save(variables: {
    email: string;
    password: string;
  }): void;
}> = ({
  loading,
  errors,
  save,
}) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    save({
      email: email || "",
      password: password || "",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      {errors && errors.messages.base &&
        <div className="notification is-danger">
          {sentence(errors.messages.base)}
        </div>
      }

      <Field
        icon="envelope"
        type="email"
        field="email"
        value={email || ""}
        label="Email"
        placeholder="Email"
        errors={errors}
        onValue={setEmail}
      />

      <Field
        icon="lock"
        type="password"
        field="password"
        value={password || ""}
        label="Password"
        placeholder="Password"
        errors={errors}
        onValue={setPassword}
      />

      <div className="field">
        <div className="control">
          <button
            type="submit"
            disabled={loading}
            className={classnames("button", "is-primary", { "is-loading": loading })}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};
