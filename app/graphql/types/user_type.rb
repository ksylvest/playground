module Types
  class UserType < GraphQL::Schema::Object
    field :id, ID, null: false
    field :email, String, null: false
    field :name, String, null: false
    field :following, Boolean, null: false
    field :follower, Int, null: false
    field :followed, Int, null: false
    field :avatar, AttachedType, null: true
    field :feed, FeedType, null: false

    def avatar
      Loaders::ActiveStorageAttachmentLoader.for(:avatar, kind: :attachment).load(object).then do |avatar|
        avatar if avatar.attached?
      end
    end

    def feed
      ::Feed::Context.new(entries: ::Feed::Entry.where(user: object))
    end

    def following
      Current.authed? && Follow.exists?(follower: Current.user, followed: object)
    end

    def follower
      ::Loaders::CounterLoader.for(::Follow, key: :follower_id).load(object.id)
    end

    def followed
      ::Loaders::CounterLoader.for(::Follow, key: :followed_id).load(object.id)
    end
  end
end
