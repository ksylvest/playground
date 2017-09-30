Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :users, !types[Types::UserType] do
    argument :page, types.Int

    resolve ->(_obj, args, _ctx) {
      User.ordered.page(args[:page]).ordered
    }
  end
end
