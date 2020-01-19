module Billing
  module Types
    class ContextType < GraphQL::Schema::Object
      graphql_name 'Billing__Context'

      field :customer, CustomerType, null: true
    end
  end
end
