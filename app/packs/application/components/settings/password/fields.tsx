import { useState } from "react";

import { Button, Control, Field } from "tights";

import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";

import { Errors } from "@root/app_schema";
import { InputField } from "@root/application/components/input_field";

import { Flashes } from "@application/components/flashes";

export const Fields: React.FC<{
  loading: boolean;
  errors?: Errors;
  save(variables: { current: string; replacement: string }): void;
}> = ({ loading, errors, save }) => {
  const [current, setCurrent] = useState<string>("");
  const [replacement, setReplacement] = useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    save({
      current,
      replacement,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Flashes errors={errors} />

      <InputField
        icon={faLock}
        type="password"
        name="current"
        value={current}
        label="Current"
        placeholder="Current"
        errors={errors}
        onValue={setCurrent}
      />

      <InputField
        icon={faLock}
        type="password"
        name="replacement"
        value={replacement}
        label="Replacement"
        placeholder="Replacement"
        errors={errors}
        onValue={setReplacement}
      />

      <Field>
        <Control>
          <Button type="submit" disabled={loading} loading={loading} color="primary">
            Change
          </Button>
        </Control>
      </Field>
    </form>
  );
};
