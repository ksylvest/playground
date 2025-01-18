module Types
  module Billing
    class CustomerType < BaseObject
      graphql_name "Billing__Customer"

      field :id, ID, null: false
      field :currency, CurrencyType, null: true
      field :sources, [SourceType], null: false

      def sources
        dataloader
          .with(GraphQL::Sources::ActiveRecordCollection, ::Billing::Source, key: :customer_id)
          .load(object.id)
      end
    end
  end
end
