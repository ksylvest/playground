# typed: false
module Mutations
  module Avatar
    class DetachMutation < GraphQL::Schema::Mutation
      graphql_name 'DetachAvatar'
      field :status, ::Types::StatusType, null: false

      def resolve
        Current.user.avatar.detach

        { status: :ok }
      end
    end
  end
end
