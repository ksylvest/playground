module Mutations
  module Session
    class DestroyMutation < GraphQL::Schema::Mutation
      graphql_name 'DestroySession'
      argument :id, ::String, required: true
      field :status, ::Types::StatusType, null: false

      def resolve(id:)
        session = Current.user.sessions.active.find_by(id: id)
        session&.clear!

        { status: :ok }
      end
    end
  end
end
