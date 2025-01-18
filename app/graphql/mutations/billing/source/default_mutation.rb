module Mutations
  module Billing
    module Source
      class DefaultMutation < BaseMutation
        graphql_name "DefaultBillingSource"
        argument :id, ID, required: true
        field :billing, ::Types::BillingType, null: false

        def resolve(id:)
          user = context.user!
          ::Billing::DefaultSourceService.perform!(user:, id:)

          { billing: ::Billing::Context.new(user:) }
        end
      end
    end
  end
end
