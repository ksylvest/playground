module Mutations
  module Billing
    module Source
      class DefaultMutation < BaseMutation
        graphql_name 'DefaultBillingSource'
        argument :id, ID, required: true
        field :status, ::Types::StatusType, null: false

        def resolve(id:)
          ::Billing::DefaultSourceService.perform!(user: Current.user, id: id)
          { status: :ok }
        end
      end
    end
  end
end
