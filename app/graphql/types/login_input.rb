module Types
  class LoginInput < GraphQL::Schema::InputObject
    argument :email, String, required: true
    argument :password, String, required: true
  end
end
