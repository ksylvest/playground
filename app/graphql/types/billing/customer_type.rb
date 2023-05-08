module Types
  module Billing
    class CustomerType < BaseObject
      graphql_name 'Billing__Customer'

      field :id, ID, null: false
      field :currency, CurrencyType, null: true
      field :payment_methods, [PaymentMethodType], null: false

      def payment_methods
        dataloader
          .with(GraphQL::Sources::ActiveRecordCollection, ::Billing::PaymentMethod, key: :customer_id)
          .load(object.id)
      end
    end
  end
end
