declare module "@fortawesome/*";
declare module "@rails/*";

declare module "*.svg" {
  const content: string;
  export default content;
}
