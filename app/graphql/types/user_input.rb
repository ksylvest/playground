module Types
  class UserInput < GraphQL::Schema::InputObject
    argument :name, String, required: true
    argument :email, String, required: true
  end
end
