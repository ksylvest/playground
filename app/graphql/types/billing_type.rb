module Types
  class BillingType < BaseObject
    field :customer, Types::Billing::CustomerType, null: true
  end
end
