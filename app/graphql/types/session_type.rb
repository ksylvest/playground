module Types
  class SessionType < GraphQL::Schema::Object
    field :id, ID, null: false
    field :ip, String, null: false
    field :user, UserType, null: false
    field :geography, GeographyType, null: true

    def geography
      Loaders::GeoIPLoader.load(object.ip)
    end
  end
end
