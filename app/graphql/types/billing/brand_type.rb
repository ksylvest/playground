module Types
  module Billing
    class BrandType < GraphQL::Schema::Enum
      graphql_name 'BillingBrand'

      value 'AMERICAN_EXPRESS', value: 'American Express'
      value 'DINERS_CLUB', value: 'Diners Club'
      value 'DISCOVER', value: 'Discover'
      value 'JCB', value: 'JCB'
      value 'MASTERCARD', value: 'MasterCard'
      value 'UNIONPAY', value: 'UnionPay'
      value 'VISA', value: 'Visa'
      value 'UNKNOWN', value: 'Unknown'
    end
  end
end
