module Types
  module Billing
    class PaymentMethodType < BaseObject
      graphql_name 'Billing__PaymentMethod'

      field :id, ID, null: false
      field :number, String, null: false
      field :brand, PaymentMethod::BrandEnum, null: false
      field :exp, String, null: false
      field :default, Boolean, null: false, method: :default?
    end
  end
end
