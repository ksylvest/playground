module Mutations
  class LogoutMutation < AuthMutation
    field :status, ::Types::StatusType, null: false

    def resolve
      deauth!
      { status: :ok }
    end
  end
end
