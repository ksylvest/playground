module Mutations
  module Billing
    module PaymentMethod
      class BuildMutation < BaseMutation
        graphql_name 'BuildBillingPaymentMethod'
        argument :source, String, required: true
        field :billing, ::Types::BillingType, null: false

        def resolve(source:)
          user = Current.user
          ::Billing::BuildPaymentMethodService.perform!(user: user, source: source)

          { billing: ::Billing::Context.new(user: user) }
        end
      end
    end
  end
end
