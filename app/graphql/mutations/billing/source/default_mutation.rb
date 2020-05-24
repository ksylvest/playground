module Mutations
  module Billing
    module Source
      class DefaultMutation < BaseMutation
        graphql_name 'DefaultBillingSource'
        argument :id, ID, required: true
        field :billing, ::Types::BillingType, null: false

        def resolve(id:)
          user = Current.user
          ::Billing::DefaultSourceService.perform!(user: user, id: id)

          { billing: ::Billing::Context.new(user: user) }
        end
      end
    end
  end
end
