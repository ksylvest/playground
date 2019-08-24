module Types
  module Billing
    class IntervalType < GraphQL::Schema::Enum
      graphql_name 'BillingInterval'

      value 'YEAR', value: 'year'
      value 'MONTH', value: 'month'
    end
  end
end
