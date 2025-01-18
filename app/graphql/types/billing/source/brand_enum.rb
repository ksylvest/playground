module Types
  module Billing
    module Source
      class BrandEnum < BaseEnum
        graphql_name "Billing__Source__Brand"

        ::Billing::Source.brands.each_key do |brand|
          value brand.upcase, value: brand
        end
      end
    end
  end
end
