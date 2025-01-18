module Mutations
  module Billing
    module Source
      class BuildMutation < BaseMutation
        graphql_name "BuildBillingSource"
        argument :source, String, required: true
        field :billing, ::Types::BillingType, null: false

        def resolve(source:)
          user = context.user!
          ::Billing::BuildSourceService.perform!(user:, source:)

          { billing: ::Billing::Context.new(user:) }
        end
      end
    end
  end
end
