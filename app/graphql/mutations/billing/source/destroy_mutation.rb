module Mutations
  module Billing
    module Source
      class DestroyMutation < BaseMutation
        graphql_name "DestroyBillingSource"
        argument :id, ID, required: true
        field :billing, ::Types::BillingType, null: false

        def resolve(id:)
          user = context.user!
          ::Billing::DestroySourceService.perform!(user:, id:)

          { billing: ::Billing::Context.new(user:) }
        end
      end
    end
  end
end
