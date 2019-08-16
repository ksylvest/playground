declare module "@fortawesome/*";
declare module "@rails/*";

declare module "*.gql" {
  import { DocumentNode } from "graphql";
  const value: DocumentNode;
  export = value;
}
