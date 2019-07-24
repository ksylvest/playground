module Mutations
  module Notification
    class ReadMutation < GraphQL::Schema::Mutation
      graphql_name 'ReadNotification'
      argument :id, ID, required: true
      field :status, ::Types::StatusType, null: false

      def resolve(id:)
        notification = Current.user.notifications.unread.find_by(id: id)
        notification&.read!

        { status: :ok }
      end
    end
  end
end
