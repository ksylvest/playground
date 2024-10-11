import { useEffect, useState } from "react";

import { Button, Control, Field } from "tights";

import { faEnvelope, faInfo } from "@fortawesome/free-solid-svg-icons";

import { Errors } from "@root/app_schema";
import { InputField } from "@root/application/components/input_field";

import { Flashes } from "@application/components/flashes";

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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    save({
      email,
      name,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Flashes errors={errors} />

      <InputField
        icon={faInfo}
        type="text"
        name="name"
        value={name}
        label="Name"
        placeholder="Name"
        errors={errors}
        onValue={setName}
      />

      <InputField
        icon={faEnvelope}
        type="email"
        name="email"
        value={email}
        label="Email"
        placeholder="Email"
        errors={errors}
        onValue={setEmail}
      />

      <Field>
        <Control>
          <Button type="submit" disabled={loading} loading={loading} color="primary">
            Save
          </Button>
        </Control>
      </Field>
    </form>
  );
};
