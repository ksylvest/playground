module Mutations
  class GenerateActiveStorageDirectUploadMutation < BaseMutation
    argument :name, String, required: true

    field :token, String, null: false

    def resolve(name:)
      token = ActiveStorage::DirectUploadToken.generate_direct_upload_token(
        name,
        ActiveStorage::Blob.service.name,
        Current.session
      )

      { token: token }
    end
  end
end
