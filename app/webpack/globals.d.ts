declare module "@fortawesome/*";
declare module "react_ujs";

declare module "*.gql" {
  import { DocumentNode } from "graphql";
  const value: DocumentNode;
  export = value;
}
