module Mutations
  module Feed
    module Comment
      class BuildMutation < BaseMutation
        graphql_name "BuildFeedComment"
        argument :input, Types::Feed::CommentInput, required: true
        field :status, ::Types::StatusType, null: false
        field :errors, ::Types::ErrorsType, null: true
        field :comment, ::Types::Feed::CommentType, null: true

        def resolve(input:)
          comment = ::Feed::Comment.new(input.to_h)
          comment.user = context.user!
          comment.sent_at = Time.current

          if comment.save
            { status: :ok, comment: }
          else
            { status: :unprocessable, errors: comment.errors }
          end
        end
      end
    end
  end
end
