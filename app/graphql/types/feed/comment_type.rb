module Types
  module Feed
    class CommentType < BaseObject
      graphql_name 'Feed__Comment'

      field :id, ID, null: false
      field :message, String, null: false
      field :user, UserType, null: false
      field :sent, DateTimeType, null: false, method: :sent_at

      def user
        ::Loaders::AssociationLoader.for(:user).load(object)
      end
    end
  end
end
