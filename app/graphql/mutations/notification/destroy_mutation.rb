module Mutations
  module Notification
    class DestroyMutation < GraphQL::Schema::Mutation
      graphql_name 'DestroyNotification'
      argument :id, ID, required: true
      field :status, ::Types::StatusType, null: false

      def resolve(id:)
        notification = Current.user.notifications.active.find_by(id: id)
        notification&.touch(:deleted_at)

        { status: :ok }
      end
    end
  end
end
