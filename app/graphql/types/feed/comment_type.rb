module Types
  module Feed
    class CommentType < BaseObject
      graphql_name "Feed__Comment"

      field :id, ID, null: false
      field :message, String, null: false
      field :user, UserType, null: false
      field :sent, DateTimeType, null: false, method: :sent_at

      def user
        dataloader
          .with(GraphQL::Sources::ActiveRecordObject, ::User, key: :id)
          .load(object.user_id)
      end
    end
  end
end
