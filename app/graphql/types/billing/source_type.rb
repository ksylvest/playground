module Types
  module Billing
    class SourceType < GraphQL::Schema::Object
      graphql_name 'BillingSource'

      field :id, ID, null: false
      field :number, String, null: false
      field :brand, BrandType, null: false
      field :exp, DateType, null: false
      field :default, Boolean, null: false, method: :default?
    end
  end
end
