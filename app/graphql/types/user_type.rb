module Types
  class UserType < GraphQL::Schema::Object
    field :id, ID, null: false
    field :email, String, null: false
    field :name, String, null: false
    field :avatar, AttachedType, null: true

    def avatar
      Loaders::ActiveStorageAttachmentLoader.for(:avatar, kind: :attachment).load(object).then do |avatar|
        avatar if avatar.attached?
      end
    end
  end
end
