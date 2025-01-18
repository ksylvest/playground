module Mutations
  module User
    class UnfollowMutation < BaseMutation
      graphql_name "UnfollowUser"
      argument :id, ID, required: true
      field :user, ::Types::UserType, null: false

      def resolve(id:)
        user = ::User.find(id)
        Follow.destroy_by(follower: context.user!, followed: user)

        { user: }
      end
    end
  end
end
