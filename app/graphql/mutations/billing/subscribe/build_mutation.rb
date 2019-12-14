module Mutations
  module Billing
    module Subscribe
      class BuildMutation < GraphQL::Schema::Mutation
        graphql_name 'BuildBillingSubscribe'
        argument :planID, ID, required: true
        field :status, ::Types::StatusType, null: false

        def resolve(plan_id:)
          ::Billing::BuildSubscribeService.perform!(user: Current.user, plan_id: plan_id)
          { status: :ok }
        end
      end
    end
  end
end
