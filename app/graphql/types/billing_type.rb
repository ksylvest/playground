module Types
  class BillingType < BaseObject
    field :id, ID, null: false
    field :customer, Types::Billing::CustomerType, null: true
  end
end
