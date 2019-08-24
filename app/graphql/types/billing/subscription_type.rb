module Types
  module Billing
    class SubscriptionType < GraphQL::Schema::Object
      graphql_name 'BillingSubscription'

      field :id, ID, null: false
      field :plan, PlanType, null: false

      def plan
        Loaders::AssociationLoader.for(:plan).load(object)
      end
    end
  end
end
