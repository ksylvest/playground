module Types
  module Billing
    module PaymentMethod
      class BrandEnum < BaseEnum
        graphql_name 'Billing__PaymentMethod__Brand'

        ::Billing::PaymentMethod.brands.each_key do |brand|
          value brand.upcase, value: brand
        end
      end
    end
  end
end
