module Types
  class BillingType < BaseObject
    field :id, ID, null: false
    field :customer, Types::Billing::CustomerType, null: true
    field :products, [Types::Billing::ProductType], null: false
  end
end
