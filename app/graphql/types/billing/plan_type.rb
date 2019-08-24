module Types
  module Billing
    class PlanType < GraphQL::Schema::Object
      graphql_name 'BillingPlan'

      field :id, ID, null: false
      field :amount, Integer, null: false
      field :currency, CurrencyType, null: false
      field :interval, IntervalType, null: false
    end
  end
end
