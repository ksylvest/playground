class AppSchema < GraphQL::Schema
  query ::Types::QueryType
  mutation ::Types::MutationType

  use GraphQL::Execution::Interpreter
  use GraphQL::Analysis::AST
  use GraphQL::Pagination::Connections
  use GraphQL::Batch
end
