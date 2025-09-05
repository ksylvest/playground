import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "app/graphql/app_schema.graphql",
  documents: ["app/packs/application/**/*.gql"],
  generates: {
    "app/packs/app_schema.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        useTypeImports: true,
        scalars: {
          DateTime: "string",
        },
      },
    },
  },
};

export default config;
