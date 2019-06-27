module Types
  class UserType < GraphQL::Schema::Object
    field :id, ID, null: false
    field :email, String, null: false
    field :name, String, null: false
    field :avatar, AttachedType, null: true

    def avatar
      object.avatar if object.avatar.attached?
    end
  end
end
