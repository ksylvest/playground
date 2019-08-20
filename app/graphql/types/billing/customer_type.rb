module Types
  module Billing
    class CustomerType < GraphQL::Schema::Object
      graphql_name 'BillingCustomer'

      field :id, ID, null: false
      field :currency, CurrencyType, null: true
      field :sources, [SourceType], null: false

      def sources
        Loaders::AssociationLoader.for(:sources).load(object)
      end
    end
  end
end
