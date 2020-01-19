module Types
  class QueryType < GraphQL::Schema::Object
    implements(::Billing::Interfaces::QueryInterface)
  end
end
