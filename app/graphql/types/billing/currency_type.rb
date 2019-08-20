module Types
  module Billing
    class CurrencyType < GraphQL::Schema::Enum
      graphql_name 'BillingCurrency'

      value 'CAD', value: 'cad'
      value 'EUR', value: 'eur'
      value 'USD', value: 'usd'
    end
  end
end
