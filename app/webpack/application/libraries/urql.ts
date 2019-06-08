import { createClient } from "urql";

export const CLIENT = createClient({ url: "/graphql" });
