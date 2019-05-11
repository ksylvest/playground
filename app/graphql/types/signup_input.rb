module Types
  class SignupInput < GraphQL::Schema::InputObject
    argument :name, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true
  end
end
