module Types
  module Billing
    class SourceType < BaseObject
      graphql_name "Billing__Source"

      field :id, ID, null: false
      field :number, String, null: false
      field :brand, Source::BrandEnum, null: false
      field :exp, String, null: false
      field :default, Boolean, null: false, method: :default?
    end
  end
end
