module Types
  module Billing
    class CustomerType < BaseObject
      graphql_name 'Billing__Customer'

      field :id, ID, null: false
      field :currency, CurrencyType, null: true
      field :sources, [SourceType], null: false
      field :subscription, SubscriptionType, null: true

      def sources
        Loaders::AssociationLoader.for(:sources).load(object)
      end

      def subscription
        Loaders::AssociationLoader.for(:subscription).load(object)
      end
    end
  end
end
