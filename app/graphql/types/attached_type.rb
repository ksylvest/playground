module Types
  class AttachedType < GraphQL::Schema::Object
    field :id, String, null: false
    field :filename, String, null: false
    field :variant, String, null: false do
      argument :l, Int, required: true, as: :length
      argument :w, Int, required: true, as: :width
      argument :format, Attached::FormatType, required: false
      argument :resize, Attached::ResizeType, required: false
    end

    def variant(length:, width:, format: :jpg, resize: :fill)
      size = [
        length,
        width,
      ]
      variant_url(object.variant("resize_to_#{resize}": size, convert: format), format)
    end

  private

    def variant_url(variant, format)
      Rails.application.routes.url_helpers.rails_blob_representation_path(
        variant.blob.signed_id,
        variant.variation.key,
        "#{variant.filename.base}.#{format}"
      )
    end
  end
end
