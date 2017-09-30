Types::SessionType = GraphQL::ObjectType.define do
  name 'Session'

  field :ip, !types.ID
end
