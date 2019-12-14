module Types
  class BillingType < GraphQL::Schema::Object
    field :customer, Types::Billing::CustomerType, null: true
    field :products, [Types::Billing::ProductType], null: false
  end
end
