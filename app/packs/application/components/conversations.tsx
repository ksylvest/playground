import { Conversations } from "@twilio/conversations";

export const Conversations: React.FC = () => {
  useEffect(() => {
    new Conversations.Client.create(token);
  }, [];
};
