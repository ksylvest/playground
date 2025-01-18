namespace :graphql do
  namespace :schema do
    desc 'Generate a "app/graphql/schema.graphql"'
    task generate: :environment do
      Rails.root.join("app/graphql/app_schema.graphql").write(AppSchema.to_definition)
    end
  end
end
