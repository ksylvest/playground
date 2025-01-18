module Types
  module Billing
    class CurrencyType < BaseEnum
      graphql_name "Billing__Currency"

      value "CAD", value: "cad"
      value "EUR", value: "eur"
      value "USD", value: "usd"
    end
  end
end
