module Billing
  module Types
    class StatusType < GraphQL::Schema::Enum
      graphql_name 'Billing__Status'

      value 'OK', value: :ok
      value 'UNPROCESSABLE', value: :unprocessable
    end
  end
end
