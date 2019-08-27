module Mutations
  module Notification
    class DestroyMutation < GraphQL::Schema::Mutation
      graphql_name 'DestroyNotification'
      argument :id, ID, required: true
      field :notification, ::Types::NotificationType, null: false

      def resolve(id:)
        notification = Current.user.notifications.find_by!(id: id)
        notification.clear!

        { notification: notification }
      end
    end
  end
end
