module Mutations
  class LoginMutation < AuthMutation
    argument :input, ::Types::LoginInput, required: true

    field :status, ::Types::StatusType, null: false
    field :errors, ::Types::ErrorsType, null: true
    field :session, ::Types::SessionType, null: true

    def resolve(input:)
      auth = Auth.new(input.to_h)
      user = auth.authenticate
      if user
        auth!(user)
        { status: :ok, session: Current.session }
      else
        { status: :unprocessable, errors: auth.errors }
      end
    end
  end
end
