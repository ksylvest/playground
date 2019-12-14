module Types
  module Billing
    class CustomerType < GraphQL::Schema::Object
      graphql_name 'Billing__Customer'

      field :id, ID, null: false
      field :currency, CurrencyType, null: true
      field :sources, [SourceType], null: false
      field :subscriptions, [SubscriptionType], null: false

      def sources
        Loaders::AssociationLoader.for(:sources).load(object)
      end

      def subscriptions
        Loaders::AssociationLoader.for(:subscriptions).load(object)
      end
    end
  end
end
