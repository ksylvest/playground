module Types
  class AttachedType < GraphQL::Schema::Object
    field :id, String, null: false
    field :filename, String, null: false
  end
end
