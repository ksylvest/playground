module Mutations
  class SignupMutation < BaseMutation
    argument :input, ::Types::SignupInput, required: true

    field :status, ::Types::StatusType, null: false
    field :errors, ::Types::ErrorsType, null: true
    field :token, String, null: true

    def resolve(input:)
      user = ::User.new(input.to_h)

      if user.save
        authentication = user.authentications.build
        authentication.save!

        { status: :ok, token: authentication.token }
      else
        { status: :unprocessable, errors: user.errors }
      end
    end
  end
end
