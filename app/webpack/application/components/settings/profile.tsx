import * as React from "react";
import { useContext } from "react";

import { Status, useSettingsChangeProfileMutation, useSettingsProfileQuery } from "@root/app_schema";

import { Title } from "@application/components/helpers";

import { World } from "@application/contexts";

import { Fields } from "./profile/fields";

export const Profile: React.FC = () => {
  const { notify } = useContext(World);
  const { data: defaults, loading: querying } = useSettingsProfileQuery();
  const [submit, { data, loading: mutating }] = useSettingsChangeProfileMutation({
    onCompleted: ({ result }) => {
      if (result && result.status === Status.Ok) {
        notify({
          kind: "notice",
          message: "Your profile has been saved.",
        });
      }
    },
  });
  const errors = data?.result?.errors || undefined;
  const loading = querying || mutating;

  return (
    <>
      <Title>Settings - Profile | Playground</Title>

      <h2 className="title">Profile</h2>
      <hr />
      <Fields
        defaults={(defaults && defaults.me) || undefined}
        save={(input) => {
          if (loading) {
            return;
          }
          submit({ variables: { input } });
        }}
        loading={loading}
        errors={errors}
      />
    </>
  );
};
