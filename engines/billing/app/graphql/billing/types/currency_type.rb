module Billing
  module Types
    class CurrencyType < GraphQL::Schema::Enum
      graphql_name 'Billing__Currency'

      value 'CAD', value: 'cad'
      value 'EUR', value: 'eur'
      value 'USD', value: 'usd'
    end
  end
end
