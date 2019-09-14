import * as React from "react";
import { useContext } from "react";

import { Status, useSettingsChangeProfileMutation, useSettingsProfileQuery } from "@root/app_schema";

import { Title } from "@application/components/helpers";

import { World } from "@application/contexts";

import { Fields } from "./profile/fields";

export const Profile: React.FC = () => {
  const { notify } = useContext(World);
  const { data: defaults, loading: querying } = useSettingsProfileQuery();
  const [submit, { data, loading: mutating }] = useSettingsChangeProfileMutation();
  const errors = (data && data.changeProfile && data.changeProfile.errors) || undefined;

  return (
    <>
      <Title>Settings - Profile | Playground</Title>

      <h2 className="title">Profile</h2>
      <hr />
      <Fields
        defaults={(defaults && defaults.user) || undefined}
        save={async (input) => {
          if (querying || mutating) {
            return;
          }
          const result = await submit({ variables: { input } });
          const status = result.data && result.data.changeProfile && result.data.changeProfile.status;
          if (status === Status.Ok) {
            notify({
              kind: "notice",
              message: "Your profile has been saved.",
            });
          }
        }}
        loading={querying || mutating}
        errors={errors}
      />
    </>
  );
};
