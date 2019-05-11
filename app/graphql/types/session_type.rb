module Types
  class SessionType < GraphQL::Schema::Object
    field :id, ID, null: false
    field :ip, String, null: false
  end
end
