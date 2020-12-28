module Mutations
  class SignupMutation < BaseMutation
    argument :input, ::Types::SignupInput, required: true

    field :status, ::Types::StatusType, null: false
    field :errors, ::Types::ErrorsType, null: true
    field :session, ::Types::SessionType, null: true

    def resolve(input:)
      user = ::User.new(input.to_h)
      if user.save
        session = Current.auth!(user)
        { status: :ok, session: session }
      else
        { status: :unprocessable, errors: user.errors }
      end
    end
  end
end
