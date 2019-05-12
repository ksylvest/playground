import * as cn from "classnames";
import * as React from "react";
import { useState } from "react";

import { IErrors } from "@application/types";

import { sentence } from "@application/utilities";

import { Field } from "@application/components/field";

export const Form: React.FC<{
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
  const [name, setName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    save({
      email: email || "",
      name: name || "",
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
        icon="info"
        type="text"
        field="name"
        value={name || ""}
        label="Name"
        placeholder="Name"
        errors={errors}
        onValue={setName}
      />

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
            className={cn("button", "is-primary", { "is-loading": loading })}
          >
            Signup
          </button>
        </div>
      </div>
    </form>
  );
};
