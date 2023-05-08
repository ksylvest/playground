module Mutations
  module Billing
    module PaymentMethod
      class DestroyMutation < BaseMutation
        graphql_name 'DestroyBillingPaymentMethod'
        argument :id, ID, required: true
        field :billing, ::Types::BillingType, null: false

        def resolve(id:)
          user = Current.user
          ::Billing::DestroyPaymentMethodService.perform!(user: user, id: id)

          { billing: ::Billing::Context.new(user: user) }
        end
      end
    end
  end
end
