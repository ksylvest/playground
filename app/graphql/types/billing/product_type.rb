module Types
  module Billing
    class ProductType < GraphQL::Schema::Object
      graphql_name 'BillingProduct'

      field :id, ID, null: false
      field :name, String, null: false
      field :plans, [PlanType], null: false

      def plans
        Loaders::AssociationLoader.for(:plans).load(object)
      end
    end
  end
end
