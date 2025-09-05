import { useContext } from "react";

import { useMutation, useQuery } from "@apollo/client/react";

import { SettingsChangeProfileDocument, SettingsProfileDocument, Status } from "@root/app_schema";

import { World } from "@application/contexts/world";

import { Title } from "@application/components/helpers/title";

import { Fields } from "./profile/fields";

export const Profile: React.FC = () => {
  const { notify } = useContext(World);
  const { data: defaults, loading: querying } = useQuery(SettingsProfileDocument);
  const [submit, { data, loading: mutating }] = useMutation(SettingsChangeProfileDocument, {
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
        save={(input): void => {
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
