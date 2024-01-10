import React from "react";
import { useContext } from "react";

import { Status, useSettingsPasswordMutation } from "@root/app_schema";

import { Title } from "@application/components/helpers/title";

import { World } from "@application/contexts/world";

import { Fields } from "./password/fields";

export const Password: React.FC = () => {
  const { notify } = useContext(World);
  const [submit, { loading, data }] = useSettingsPasswordMutation({
    onCompleted: ({ result }) => {
      if (result && result.status === Status.Ok) {
        notify({
          kind: "notice",
          message: "Your password has been saved.",
        });
      }
    },
  });
  const errors = data?.result?.errors || undefined;

  return (
    <>
      <Title>Settings - Password | Playground</Title>

      <h2 className="title">Password</h2>
      <hr />
      <Fields
        loading={loading}
        errors={errors}
        save={(password): void => {
          submit({
            variables: { password },
          });
        }}
      />
    </>
  );
};
