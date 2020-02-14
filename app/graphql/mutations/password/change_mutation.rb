module Mutations
  module Password
    class ChangeMutation < BaseMutation
      graphql_name 'ChangePassword'
      argument :input, ::Types::PasswordInput, required: true
      field :status, ::Types::StatusType, null: false
      field :errors, ::Types::ErrorsType, null: true

      def resolve(input:)
        user = Current.user
        change = ::Password::Change.new(current: input[:current], replacement: input[:replacement], user: user)

        if change.save!
          { status: :ok }
        else
          { status: :unprocessable, errors: change.errors }
        end
      end
    end
  end
end
