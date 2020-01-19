require 'graphql'

module Billing
  module Mutations
    module Source
      class BuildMutation < GraphQL::Schema::Mutation
        graphql_name 'BuildBillingSource'
        argument :source, String, required: true
        field :status, Types::StatusType, null: false

        def resolve(source:)
          ::Billing::BuildSourceService.perform!(user: Current.user, source: source)
          { status: :ok }
        end
      end
    end
  end
end
