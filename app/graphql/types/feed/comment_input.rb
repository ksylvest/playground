module Types
  module Feed
    class CommentInput < BaseInputObject
      graphql_name "Feed__CommentInput"

      argument :entryID, ID, required: true, as: :entry_id
      argument :message, String, required: true
    end
  end
end
