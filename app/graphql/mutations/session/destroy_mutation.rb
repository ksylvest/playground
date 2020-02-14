module Mutations
  module Session
    class DestroyMutation < BaseMutation
      graphql_name 'DestroySession'
      argument :id, ::String, required: true
      field :session, ::Types::SessionType, null: false

      def resolve(id:)
        session = Current.user.sessions.find_by(id: id)
        session.clear!

        { session: session }
      end
    end
  end
end
