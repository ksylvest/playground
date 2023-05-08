module Mutations
  module Billing
    module StripeSetupIntent
      class BuildMutation < BaseMutation
        graphql_name 'BuildStripeSetupIntentService'
        field :stripe_setup_intent, ::Types::Billing::StripeSetupIntentType, null: false

        def resolve
          user = Current.user
          stripe_setup_intent = ::Billing::BuildStripeSetupIntentService.perform!(user: user)

          { stripe_setup_intent: }
        end
      end
    end
  end
end
