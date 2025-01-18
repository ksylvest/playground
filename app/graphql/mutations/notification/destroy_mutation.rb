module Mutations
  module Notification
    class DestroyMutation < BaseMutation
      graphql_name "DestroyNotification"
      argument :id, ID, required: true
      field :notification, ::Types::NotificationType, null: false

      def resolve(id:)
        notification = context.user!.notifications.find(id)
        notification.clear!

        { notification: }
      end
    end
  end
end
