namespace :graphql do
  namespace :schema do
    desc 'Generate a "app/graphql/schema.graphql"'
    task generate: :environment do
      File.write(Rails.root.join('app/graphql/app_schema.graphql'), AppSchema.to_definition)
    end
  end
end
