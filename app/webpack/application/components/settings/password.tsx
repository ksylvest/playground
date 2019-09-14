import * as React from "react";
import { useContext } from "react";

import { Status, useSettingsPasswordMutation } from "@root/app_schema";

import { Title } from "@application/components/helpers";

import { World } from "@application/contexts";

import { Fields } from "./password/fields";

export const Password: React.FC = () => {
  const { notify } = useContext(World);
  const [submit, { loading, data }] = useSettingsPasswordMutation();
  const errors = (data && data.changePassword && data.changePassword.errors) || undefined;

  return (
    <>
      <Title>Settings - Password | Playground</Title>

      <h2 className="title">Password</h2>
      <hr />
      <Fields
        loading={loading}
        errors={errors}
        save={async (input) => {
          if (loading) {
            return;
          }
          const result = await submit({
            variables: { input },
          });
          const status = result.data && result.data.changePassword && result.data.changePassword.status;
          if (status === Status.Ok) {
            notify({
              kind: "notice",
              message: "Your password has been saved.",
            });
          }
        }}
      />
    </>
  );
};
