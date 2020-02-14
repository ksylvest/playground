module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    null(false) # default every mutation returns
  end
end
