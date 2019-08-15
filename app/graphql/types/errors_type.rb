module Types
  class ErrorsType < GraphQL::Schema::Object
    field :messages, GraphQL::Types::JSON, null: false
  end
end
