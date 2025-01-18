module Mutations
  module Avatar
    class AttachMutation < BaseMutation
      graphql_name "AttachAvatar"
      argument :id, ID, required: true
      field :status, ::Types::StatusType, null: false

      def resolve(id:)
        context.user!.avatar.attach(id)

        { status: :ok }
      end
    end
  end
end
