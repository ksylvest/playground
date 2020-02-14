module Mutations
  class LoginMutation < BaseMutation
    argument :input, ::Types::LoginInput, required: true

    field :status, ::Types::StatusType, null: false
    field :errors, ::Types::ErrorsType, null: true
    field :session, ::Types::SessionType, null: true

    def resolve(input:)
      auth = Auth.new(input.to_h)
      user = auth.authenticate
      if user
        session = Current.auth!(user: user)
        { status: :ok, session: session }
      else
        { status: :unprocessable, errors: auth.errors }
      end
    end
  end
end
