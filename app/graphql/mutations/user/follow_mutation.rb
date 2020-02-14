module Mutations
  module User
    class FollowMutation < BaseMutation
      graphql_name 'FollowUser'
      argument :id, ID, required: true
      field :user, ::Types::UserType, null: false

      def resolve(id:)
        user = ::User.find(id)
        Follow.find_or_initialize_by(follower: Current.user, followed: user).save!

        { user: user }
      end
    end
  end
end
