module Types
  module Feed
    class EntryType < GraphQL::Schema::Object
      graphql_name 'Feed__Entry'

      field :id, ID, null: false
      field :tags, [String], null: false
      field :photos, [AttachedType], null: false
      field :user, UserType, null: false

      def photos
        ::Loaders::ActiveStorageAttachmentLoader.for(:photos, kind: :attachments).load(object)
      end

      def user
        ::Loaders::AssociationLoader.for(:user).load(object)
      end
    end
  end
end
