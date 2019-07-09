module Types
  class QueryType < GraphQL::Schema::Object
    field :user, UserType, null: true
    field :sessions, [SessionType], null: false
    field :notifications, [NotificationType], null: false

    def user
      Current.user
    end

    def sessions
      Current.user.sessions.active.chronological
    end

    def notifications
      Current.user.notifications.active.chronological
    end
  end
end
