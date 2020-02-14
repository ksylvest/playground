module Mutations
  class LogoutMutation < BaseMutation
    field :status, ::Types::StatusType, null: false

    def resolve
      Current.deauth!
      { status: :ok }
    end
  end
end
