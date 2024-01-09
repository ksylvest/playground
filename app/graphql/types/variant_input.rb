module Types
  class VariantInput < BaseInputObject
    argument :w, Int, required: true
    argument :h, Int, required: true
    argument :format, Variant::FormatEnum, required: true
    argument :resize, Variant::ResizeEnum, required: true

    def parameterize
      {
        format:,
        resize:,
        size: [
          w,
          h,
        ],
      }
    end
  end
end
