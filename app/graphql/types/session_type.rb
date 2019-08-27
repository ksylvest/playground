module Types
  class SessionType < GraphQL::Schema::Object
    field :id, ID, null: false
    field :ip, String, null: false
    field :status, SessionStatusEnum, null: false
    field :user, UserType, null: false
    field :geography, GeographyType, null: true
    field :deleted, Boolean, null: false, method: :deleted_at?
    field :seen, DateTimeType, null: false, method: :seen_at

    def geography
      Loaders::GeoIPLoader.load(object.ip)
    end
  end
end
