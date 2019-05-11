module Mutations
  class SignupMutation < AuthMutation
    argument :input, ::Types::SignupInput, required: true

    field :status, ::Types::StatusType, null: false
    field :errors, ::Types::ErrorsType, null: true
    field :user, ::Types::UserType, null: true

    def resolve(input:)
      user = User.new(input.to_h)
      if user.save
        auth!(user)
        { status: :ok, user: user }
      else
        { status: :unprocessable, errors: user.errors }
      end
    end
  end
end
