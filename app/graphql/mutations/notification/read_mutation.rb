module Mutations
  module Notification
    class ReadMutation < BaseMutation
      graphql_name 'ReadNotification'
      argument :id, ID, required: true
      field :notification, ::Types::NotificationType, null: false

      def resolve(id:)
        notification = Current.user.notifications.find_by!(id: id)
        notification.read!

        { notification: notification }
      end
    end
  end
end
