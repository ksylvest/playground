module Types
  module Billing
    class StripeSetupIntentType < BaseObject
      graphql_name 'Billing__StripeSetupIntent'

      field :id, ID, null: false
    end
  end
end
