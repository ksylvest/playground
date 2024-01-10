class AppSchema < GraphQL::Schema
  context_class AppContext

  query ::Types::QueryType
  mutation ::Types::MutationType

  use GraphQL::Dataloader
end
