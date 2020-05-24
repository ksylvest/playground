module Mutations
  module Billing
    module Subscription
      class BuildMutation < GraphQL::Schema::Mutation
        graphql_name 'BuildBillingSubscription'
        argument :planID, ID, required: true, as: :plan_id
        field :status, ::Types::StatusType, null: false

        def resolve(plan_id:)
          ::Billing::BuildSubscriptionService.perform!(user: Current.user, plan_id: plan_id)
          { status: :ok }
        end
      end
    end
  end
end
