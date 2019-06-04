module Mutations
  class LogoutMutation < GraphQL::Schema::Mutation
    field :status, ::Types::StatusType, null: false

    def resolve
      Current.deauth!
      { status: :ok }
    end
  end
end
