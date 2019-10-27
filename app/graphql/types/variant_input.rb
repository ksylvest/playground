module Types
  class VariantInput < GraphQL::Schema::InputObject
    argument :w, Int, required: true
    argument :h, Int, required: true
    argument :format, Variant::FormatEnum, required: true
    argument :resize, Variant::ResizeEnum, required: true

    def parameterize
      {
        format: format,
        resize: resize,
        size: [
          w,
          h,
        ],
      }
    end
  end
end
