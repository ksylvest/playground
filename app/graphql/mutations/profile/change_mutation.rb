module Mutations
  module Profile
    class ChangeMutation < GraphQL::Schema::Mutation
      graphql_name 'ChangeProfile'
      argument :input, ::Types::UserInput, required: true
      field :status, ::Types::StatusType, null: false
      field :errors, ::Types::ErrorsType, null: true

      def resolve(input:)
        user = Current.user
        user.attributes = input.to_h

        if user.save
          { status: :ok }
        else
          { status: :unprocessable, errors: user.errors }
        end
      end
    end
  end
end
