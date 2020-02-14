module Mutations
  module Avatar
    class DetachMutation < BaseMutation
      graphql_name 'DetachAvatar'
      field :status, ::Types::StatusType, null: false

      def resolve
        Current.user.avatar.detach

        { status: :ok }
      end
    end
  end
end
