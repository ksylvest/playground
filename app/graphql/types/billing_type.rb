module Types
  class BillingType < GraphQL::Schema::Object
    field :customer, Types::Billing::CustomerType, null: true
  end
end
