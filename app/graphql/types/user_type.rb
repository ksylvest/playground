module Types
  class UserType < BaseObject
    field :id, ID, null: false
    field :email, String, null: false
    field :name, String, null: false
    field :following, Boolean, null: false
    field :follower, Int, null: false
    field :followed, Int, null: false
    field :avatar, AttachedType, null: true
    field :feed, FeedType, null: false

    def avatar
      dataloader
        .with(GraphQL::Sources::ActiveStorageHasOneAttached, :avatar)
        .load(object)
    end

    def feed
      ::Feed::Context.new(user: object)
    end

    def following
      context.authed? && Follow.exists?(follower: context.user!, followed: object)
    end

    def follower
      dataloader
        .with(GraphQL::Sources::ActiveRecordCount, ::Follow, key: :follower_id)
        .load(object.id)
    end

    def followed
      dataloader
        .with(GraphQL::Sources::ActiveRecordCount, ::Follow, key: :followed_id)
        .load(object.id)
    end
  end
end
