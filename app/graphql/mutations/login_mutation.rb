module Mutations
  class LoginMutation < BaseMutation
    argument :input, ::Types::LoginInput, required: true

    field :status, ::Types::StatusType, null: false
    field :errors, ::Types::ErrorsType, null: true
    field :authentication, ::Types::AuthenticationType, null: true

    def resolve(input:)
      auth = Auth.new(input.to_h)
      user = auth.authenticate
      if user
        authentication = Current.auth!(user)
        { status: :ok, authentication: authentication }
      else
        { status: :unprocessable, errors: auth.errors }
      end
    end
  end
end
