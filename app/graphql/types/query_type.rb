module Types
  class QueryType < GraphQL::Schema::Object
    field :billing, BillingType, null: false
    field :feed, FeedType, null: false
    field :notifications, [NotificationType], null: false
    field :sessions, [SessionType], null: false
    field :user, UserType, null: false do
      argument :id, ID, required: true
    end
    field :me, UserType, null: true

    def billing
      ::Billing::Context.new(user: Current.user)
    end

    def feed
      ::Feed::Context.new
    end

    def notifications
      Current.user.notifications.active.chronological
    end

    def sessions
      Current.user.sessions.active.chronological
    end

    def user(id:)
      User.find(id)
    end

    def me
      Current.user
    end
  end
end
