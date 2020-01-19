module Billing
  module Types
    class CustomerType < GraphQL::Schema::Object
      graphql_name 'Billing__Customer'

      field :id, ID, null: false
      field :currency, CurrencyType, null: true
      field :sources, [SourceType], null: false

      def sources
        ::Billing::Loaders::ActiveRecordAssociationLoader.for(:sources).load(object)
      end
    end
  end
end
