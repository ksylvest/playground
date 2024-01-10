module Mutations
  class LogoutMutation < BaseMutation
    field :status, ::Types::StatusType, null: false

    def resolve
      context.authentication&.clear!

      { status: :ok }
    end
  end
end
