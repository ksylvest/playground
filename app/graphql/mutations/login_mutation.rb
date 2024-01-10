module Mutations
  class LoginMutation < BaseMutation
    argument :input, ::Types::LoginInput, required: true

    field :status, ::Types::StatusType, null: false
    field :errors, ::Types::ErrorsType, null: true
    field :token, String, null: true

    def resolve(input:)
      auth = Auth.new(input.to_h)
      user = auth.user

      if user
        authentication = user.authentications.build
        authentication.save!

        { status: :ok, token: authentication.token }
      else
        { status: :unprocessable, errors: auth.errors }
      end
    end
  end
end
