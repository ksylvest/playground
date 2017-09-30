Types::UserType = GraphQL::ObjectType.define do
  name 'User'

  field :id, !types.ID
  field :name, !types.String
  field :email, !types.String
  field :sessions, types[Types::SessionType] do
    resolve ->(obj, _args, _ctx) { obj.sessions }
  end
end
