module Types
  class MutationType < GraphQL::Schema::Object
    implements(::Billing::Interfaces::MutationInterface)
  end
end
