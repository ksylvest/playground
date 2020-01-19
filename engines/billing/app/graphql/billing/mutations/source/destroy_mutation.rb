require 'graphql'

module Billing
  module Mutations
    module Source
      class DestroyMutation < GraphQL::Schema::Mutation
        graphql_name 'DestroyBillingSource'
        argument :id, ID, required: true
        field :status, Types::StatusType, null: false

        def resolve(id:)
          ::Billing::DestroySourceService.perform!(user: Current.user, id: id)
          { status: :ok }
        end
      end
    end
  end
end
