module Types
  class QueryType < BaseObject
    field :billing, BillingType, null: false
    field :feed, FeedType, null: false
    field :notifications, [NotificationType], null: false
    field :authentications, [AuthenticationType], null: false
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

    def authentications
      Current.user.authentications.active.chronological
    end

    def user(id:)
      User.find(id)
    end

    def me
      Current.user
    end
  end
end
