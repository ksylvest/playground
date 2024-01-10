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
      ::Billing::Context.new(user: context.user!)
    end

    def feed
      ::Feed::Context.new
    end

    def notifications
      context.user!.notifications.active.chronological
    end

    def authentications
      context.user!.authentications.active.chronological
    end

    def user(id:)
      User.find(id)
    end

    def me
      context.user
    end
  end
end
