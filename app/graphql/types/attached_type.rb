module Types
  class AttachedType < BaseObject
    field :id, String, null: false
    field :filename, String, null: false
    field :key, String, null: false
  end
end
