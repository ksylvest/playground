module Types
  class StatusType < GraphQL::Schema::Enum
    value 'OK', value: :ok
    value 'UNPROCESSABLE', value: :unprocessable
  end
end
