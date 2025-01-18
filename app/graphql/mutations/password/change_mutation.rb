module Mutations
  module Password
    class ChangeMutation < BaseMutation
      graphql_name "ChangePassword"
      argument :password, ::Types::PasswordInput, required: true
      field :status, ::Types::StatusType, null: false
      field :errors, ::Types::ErrorsType, null: true

      def resolve(password:)
        user = context.user!
        change = ::Password::Change.new(current: password[:current], replacement: password[:replacement], user:)

        if change.save!
          { status: :ok }
        else
          { status: :unprocessable, errors: change.errors }
        end
      end
    end
  end
end
