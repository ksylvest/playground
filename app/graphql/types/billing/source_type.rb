module Types
  module Billing
    class SourceType < BaseObject
      graphql_name 'Billing__Source'

      field :id, ID, null: false
      field :number, String, null: false
      field :brand, BrandType, null: false
      field :exp, String, null: false
      field :default, Boolean, null: false, method: :default?

      def exp
        "#{object.exp_year}-#{object.exp_month}"
      end
    end
  end
end
