module Types
  module Feed
    class EntryType < BaseObject
      graphql_name "Feed__Entry"

      field :id, ID, null: false
      field :tags, [String], null: false
      field :photos, [AttachedType], null: false
      field :comments, [CommentType], null: false
      field :user, UserType, null: false
      field :likes, Int, null: false
      field :liked, Boolean, null: false

      def comments
        dataloader
          .with(GraphQL::Sources::ActiveRecordCollection, ::Feed::Comment, key: :entry_id)
          .load(object.id)
      end

      def photos
        dataloader
          .with(GraphQL::Sources::ActiveStorageHasManyAttached, :photos)
          .load(object)
      end

      def user
        dataloader
          .with(GraphQL::Sources::ActiveRecordObject, ::User, key: :id)
          .load(object.user_id)
      end

      def likes
        dataloader
          .with(GraphQL::Sources::ActiveRecordCount, ::Feed::Like, key: :entry_id)
          .load(object.id)
      end

      def liked
        context.authed? && dataloader.with(Sources::Feed::Liked, context.user!).load(object)
      end
    end
  end
end
