module Types
  class PasswordInput < GraphQL::Schema::InputObject
    argument :current, String, required: true
    argument :replacement, String, required: true
  end
end
