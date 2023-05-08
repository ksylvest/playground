module Mutations
  module Billing
    module PaymentMethod
      class DefaultMutation < BaseMutation
        graphql_name 'DefaultBillingPaymentMethod'
        argument :id, ID, required: true
        field :billing, ::Types::BillingType, null: false

        def resolve(id:)
          user = Current.user
          ::Billing::DefaultPaymentMethodService.perform!(user: user, id: id)

          { billing: ::Billing::Context.new(user: user) }
        end
      end
    end
  end
end
