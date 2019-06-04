module Mutations
  module Session
    class DestroyMutation < GraphQL::Schema::Mutation
      argument :id, ::String, required: true
      field :status, ::Types::StatusType, null: false

      def resolve(id:)
        session = Current.user.sessions.active.find_by(id: id)
        session&.touch(:deleted_at)

        { status: :ok }
      end
    end
  end
end
