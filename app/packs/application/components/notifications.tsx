import { useQuery } from "@apollo/client/react";

import { NotificationsDocument } from "@root/app_schema";

import { Title } from "@application/components/helpers/title";

import { Authorize } from "./authorize";
import { List } from "./notifications/list";

export const Notifications: React.FC = () => {
  const { data } = useQuery(NotificationsDocument);

  return (
    <Authorize>
      <Title>Notifications | Playground</Title>

      <h2 className="title">Notifications</h2>
      <hr />
      <List notifications={data?.notifications} />
    </Authorize>
  );
};
