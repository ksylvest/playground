module Types
  module Feed
    class EntryType < GraphQL::Schema::Object
      graphql_name 'Feed__Entry'

      field :id, ID, null: false
      field :tags, [String], null: false
      field :photos, [AttachedType], null: false
      field :comments, [CommentType], null: false
      field :user, UserType, null: false
      field :likes, Int, null: false
      field :liked, Boolean, null: false

      def comments
        ::Loaders::AssociationLoader.for(:comments).load(object)
      end

      def photos
        ::Loaders::ActiveStorageAttachmentLoader.for(:photos, kind: :attachments).load(object)
      end

      def user
        ::Loaders::AssociationLoader.for(:user).load(object)
      end

      def likes
        ::Loaders::CounterLoader.for(::Feed::Like, key: :entry_id).load(object.id)
      end

      def liked
        Current.authed? && ::Feed::Like.exists?(user: Current.user, entry: object)
      end
    end
  end
end
