module Types
  module Feed
    class CommentInput < GraphQL::Schema::InputObject
      graphql_name 'Feed__CommentInput'

      argument :entryID, ID, required: true, as: :entry_id
      argument :message, String, required: true
    end
  end
end
