# typed: false
module Mutations
  module Avatar
    class AttachMutation < GraphQL::Schema::Mutation
      graphql_name 'AttachAvatar'
      argument :id, ID, required: true
      field :status, ::Types::StatusType, null: false

      def resolve(id:)
        Current.user.avatar.attach(id)

        { status: :ok }
      end
    end
  end
end
