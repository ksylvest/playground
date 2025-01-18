module Mutations
  module Profile
    class ChangeMutation < BaseMutation
      graphql_name "ChangeProfile"
      argument :input, ::Types::UserInput, required: true
      field :status, ::Types::StatusType, null: false
      field :errors, ::Types::ErrorsType, null: true

      def resolve(input:)
        user = context.user!
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
