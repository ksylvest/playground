module Types
  class AuthenticationType < BaseObject
    field :id, ID, null: false
    field :ip, String, null: false
    field :status, AuthenticationStatusEnum, null: false
    field :user, UserType, null: false
    field :geography, GeographyType, null: true
    field :deleted, Boolean, null: false, method: :deleted_at?
    field :me, Boolean, null: false
    field :seen, DateTimeType, null: false, method: :seen_at

    def geography
      dataloader
        .with(GraphQL::Sources::ActiveRecordObject, ::GeoIP, key: :ip)
        .load(object.ip)
    end

    def me
      context.authentication.eql?(object)
    end
  end
end
