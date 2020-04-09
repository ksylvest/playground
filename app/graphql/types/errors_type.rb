module Types
  class ErrorsType < BaseObject
    field :messages, GraphQL::Types::JSON, null: false
  end
end
