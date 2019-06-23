module Types
  class AttachedType < GraphQL::Schema::Object
    field :id, String, null: false
    field :filename, String, null: false
    field :url, String, null: false, method: :service_url
  end
end
