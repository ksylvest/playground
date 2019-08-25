module Types
  class QueryType < GraphQL::Schema::Object
    field :billing, BillingType, null: false
    field :notifications, [NotificationType], null: false
    field :sessions, [SessionType], null: false
    field :user, UserType, null: true

    def billing
      Current.user
    end

    def notifications
      Current.user.notifications.active.chronological
    end

    def sessions
      Current.user.sessions.active.chronological
    end

    def user
      Current.user
    end
  end
end
