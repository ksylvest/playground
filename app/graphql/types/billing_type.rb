module Types
  class BillingType < GraphQL::Schema::Object
    field :customer, Types::Billing::CustomerType, null: true

    def customer
      ::Billing::Customer.find_by(user: object)
    end
  end
end
