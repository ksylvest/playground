module Types
  class ErrorsType < GraphQL::Schema::Object
    field :messages, Types::JSON, null: false
  end
end
