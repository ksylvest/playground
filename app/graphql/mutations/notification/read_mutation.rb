module Mutations
  module Notification
    class ReadMutation < BaseMutation
      graphql_name "ReadNotification"
      argument :id, ID, required: true
      field :notification, ::Types::NotificationType, null: false

      def resolve(id:)
        notification = context.user!.notifications.find(id)
        notification.read!

        { notification: }
      end
    end
  end
end
